/**
 * Created by Widiana Putra on 07/12/2022
 * Copyright (c) 2022 - Made with love
 */

import Toast from '../../tmd/components/Toast';
import { navigate } from '../navigations/RootNavigation';

export const _componentGalleries = [
  {
    id: 1,
    title: 'Toast',
    action: () => {
      Toast.show('Damn! You are logged in!', {
        //add options here
        // colorVariant: "tertiary",
        // shape: "rounded",
      });
    },
  },
  {
    id: 2,
    title: 'Button',
    action: () => {
      navigate('ButtonScreen');
    },
  },
  {
    id: 3,
    title: 'Typography',
    action: () => {
      navigate('TypographyScreen');
    },
  },
  {
    id: 4,
    title: 'TextField',
    action: () => {
      navigate('TextFieldScreen');
    },
  },
  {
    id: 5,
    title: 'Picker',
    action: () => {
      navigate('PickerScreen');
    },
  },
  {
    id: 6,
    title: 'BottomSheet',
    action: () => {
      navigate('BottomSheetScreen');
    },
  },
  {
    id: 7,
    title: 'Modal',
    action: () => {
      navigate('ModalScreen');
    },
  },
  {
    id: 8,
    title: 'Tag',
    action: () => {
      navigate('TagScreen');
    },
  },
  {
    id: 9,
    title: 'Alert',
    action: () => {
      navigate('AlertScreen');
    },
  },
  {
    id: 10,
    title: 'Selector',
    action: () => {
      navigate('SelectorScreen');
    },
  },
  {
    id: 11,
    title: 'API Call',
    action: () => {
      navigate('APIScreen');
    },
  },
  {
    id: 12,
    title: 'Skeleton',
    action: () => {
      navigate('SkeletonScreen');
    },
  },
  {
    id: 13,
    title: 'Divider',
    action: () => {
      navigate('DividerScreen');
    },
  },
  {
    id: 14,
    title: 'Chip',
    action: () => {
      navigate('ChipScreen', {
        selected: 1,
      });
    },
  },
  {
    id: 15,
    title: 'OTP',
    action: () => {
      navigate('OTPScreen');
    },
  },
  {
    id: 16,
    title: 'Image Picker',
    action: () => {
      // navigate('ImagePickerScreen');
      navigate('BuatIklanScreen', {
        draftVoucherId: 1,
      });
    },
  },
  {
    id: 17,
    title: 'Layout Screen',
    action: () => {
      navigate('LayoutScreen');
    },
  },
  {
    id: 18,
    title: 'Tab',
    action: () => {
      navigate('TabScreen', {
        initialIndex: 2,
      });
    },
  },
  {
    id: 19,
    title: 'Avatar',
    action: () => {
      navigate('AvatarScreen');
    },
  },
  {
    id: 20,
    title: 'Badge',
    action: () => {
      navigate('BadgeScreen');
    },
  },
  {
    id: 21,
    title: 'Tooltip',
    action: () => {
      navigate('TooltipScreen');
    },
  },
  {
    id: 22,
    title: 'Progress Bar',
    action: () => {
      navigate('ProgressBarScreen');
    },
  },
  {
    id: 23,
    title: 'Signature Canvas',
    action: () => {
      navigate('SignatureCanvasScreen');
    },
  },
  {
    id: 24,
    title: 'Image',
    action: () => {
      navigate('ImageScreen');
    },
  },
  {
    id: 25,
    title: 'Carousel',
    action: () => {
      navigate('CarouselScreen');
    },
  },
  {
    id: 26,
    title: 'Stepper',
    action: () => {
      navigate('StepperScreen');
    },
  },
  {
    id: 27,
    title: 'Form Input Example',
    action: () => {
      navigate('FormScreen');
    },
  },
  {
    id: 28,
    title: 'Language',
    action: () => {
      navigate('LanguageScreen');
    },
  },
  {
    id: 29,
    title: 'Printer Example',
    action: () => {
      navigate('PrinterTDSScreen');
    },
  },
  {
    id: 30,
    title: 'App Theme',
    action: () => {
      navigate('ThemeTDSScreen');
    },
  },
  {
    id: 31,
    title: 'Bottom Nav',
    action: () => {
      navigate('BottomNavTDSScreen');
    },
  },
  {
    id: 32,
    title: 'Slider',
    action: () => {
      navigate('SliderTDSScreen');
    },
  },
  {
    id: 33,
    title: 'Accordion',
    action: () => {
      navigate('AccordionTDSScreen');
    },
  },
  {
    id: 34,
    title: 'Chat GPT',
    action: () => {
      navigate('ChatGPTScreen');
    },
  },
];
