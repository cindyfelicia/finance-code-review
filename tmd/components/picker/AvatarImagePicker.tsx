import React, { ComponentProps, useEffect, useState } from "react";
import Avatar, { AvatarVariant } from "../Avatar/Avatar";
import TextButton from "../Button/TextButton";
import ImagePickerBottomSheet from "../BottomSheet/ImagePickerBottomSheet";
import { HelperText, Stack } from "../../index";
import ImageViewerModal from "../Modal/ImageViewerModal";
import { Linking, Platform, StyleProp, View, ViewStyle } from "react-native";
import { useLocale } from "../../../src/providers/LocaleProvider";
import RNFS from "react-native-fs";
import { usePermission } from "../../providers/PermissionProvider";
import { useBottomSheet } from "../../providers/BottomSheetProvider";
import { CAMERA_PERMISSIONS, STORAGE_PERMISSIONS } from "../../data/_permissionTypes";
import { ImageOrVideo } from "react-native-image-crop-picker";

interface Props {
  initialImageUrl?: string;
  emptyVariant?: AvatarVariant;
  onImageChange?: (imageUrl: string) => void;
  onChangeImageBase64?: (imageBase64: string) => void;

  bsProps?: ComponentProps<typeof ImagePickerBottomSheet>;
  buttonStyle?: StyleProp<ViewStyle>;
  avatarStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  buttonTitle?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  isEditable?: boolean;
}

export default function AvatarImagePicker({
  initialImageUrl,
  emptyVariant = "icon",
  onImageChange, onChangeImageBase64,
  bsProps,
  buttonStyle,
  avatarStyle, style, buttonTitle,
  helperText, error, errorText, isEditable = true,
  ...rest
}: Props & ComponentProps<typeof Avatar>) {
  const [isOpenBS, setIsOpenBS] = useState(false);
  const [selectedImage, setSelectedImage] = useState(initialImageUrl);
  // const [selectedImage, setSelectedImage] = useState<ImageOrVideo>();
  const [openImagePreview, setOpenImagePreview] = useState(false);
  const { t } = useLocale();

  const { requestPermissions } = usePermission();

  const { showAlertBS, hideAlertBS } = useBottomSheet();

  const handleOpenImagePicker = () => {
    requestPermissions(
      [CAMERA_PERMISSIONS, STORAGE_PERMISSIONS()],
      () => {
        setIsOpenBS(true);
      },
      () => {
        showRejectedPermissionBS();
      },
      () => {
        showRejectedPermissionBS();
      }
    );
  };

  const showRejectedPermissionBS = () => {
    if (Platform.OS === "android") {
      showAlertBS({
        title: t('permissions.denied', { permission: `${t('permissions.cameraAndStorage')}` }),
        description: t('permissions.deniedDesc', {
          permission: `${t('permissions.cameraAndStorage').toLowerCase()}`,
        }),
        buttonPrimaryTitle: t('permissions.openSettings'),
        buttonPrimaryAction: () => {
          hideAlertBS();
          Linking.openSettings();
        },
        buttonSecondary: true,
        buttonSecondaryTitle: t('common.close'),
        buttonSecondaryAction: () => {
          hideAlertBS();
        },
      });
    } else {
      Linking.openSettings();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      console.log("initialImageUrl", initialImageUrl);
      console.log("selected image", selectedImage);
      if (selectedImage != initialImageUrl) {
        if (onImageChange) {
          onImageChange(selectedImage ?? "");
        }
        if (onChangeImageBase64) {
          convertToBase64(selectedImage, (data) => {
            onChangeImageBase64(data);
          });
        }
      }
    }
  }, [selectedImage]);

  const convertToBase64 = async (uri: string, onSuccess: (base64: string) => void) => {
    await RNFS.readFile(uri, "base64").then((data) => {
      onSuccess("data:image/png;base64," + data);
    });
  };


  return (
    <>
      <Stack items={"center"} content={"center"} spacing={8} style={[style]}>
        <View>
          <Avatar
            onPress={selectedImage ? () => {
              setOpenImagePreview(true);
            } : undefined}
            {...rest}
            variant={selectedImage ? "image" : emptyVariant}
            imageUrl={selectedImage}
            style={
              [
                {
                  alignSelf: "center",
                },
                avatarStyle]}
          />
        </View>
        <Stack items={"center"} spacing={2}>
          {
            helperText &&
            <HelperText type={"info"}>{helperText}</HelperText>
          }
          {
            (error && errorText) &&
            <HelperText type={"error"}>{errorText}</HelperText>
          }
          {
            isEditable &&
            <TextButton
              underline
              style={[buttonStyle]}
              onPress={() => {
                // setIsOpenBS(true);
                handleOpenImagePicker();
              }}>
              {buttonTitle ?? t("change_photo")}
            </TextButton>
          }
        </Stack>
      </Stack>
      <ImageViewerModal
        onClose={() => { 
          setOpenImagePreview(false);
        }}
        open={openImagePreview}
        images={[{
          image: selectedImage ?? "",
        }]} />

      <ImagePickerBottomSheet
        {...bsProps}
        selectedImage={selectedImage}
        onDelete={() => {
          setSelectedImage("");
        }}
        onChangeImage={(image) => {
          setSelectedImage(image?.path);
          setIsOpenBS(false);
        }}
        open={isOpenBS} onClose={() => {
          setIsOpenBS(false);
        }} />
    </>
  );
}
