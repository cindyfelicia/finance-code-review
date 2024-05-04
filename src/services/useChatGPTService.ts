/**
 * Created by Widiana Putra on 08/02/2023
 * Copyright (c) 2023 - Made with love
 */
import clientChatGPT from "../utils/network/clientChatGPT";

export default function useChatGPTService() {
  const postCompletion = async (text: string, maxToken?: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await clientChatGPT.post("completions", {
          prompt: text,
          temperature: 0.9,
          model: "text-davinci-003",
          max_tokens: maxToken,
        });
        resolve(response);
      } catch (e) {
        const passedErr = e?.error ? e.error : e;
        reject(passedErr);
      }
    });
  };

  return {
    postCompletion,
  }
}
