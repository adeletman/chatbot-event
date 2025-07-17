import * as sdk from "@d-id/client-sdk";

const videoElement = document.getElementById("video");
const input = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");

// Your actual values:
const agentId = "agt_5IcQ8ndx";
const auth = {
  type: "key",
  clientKey: "YXV0aDB8NjY5Y2MxMTI5NzgyMmJkNjNkYjJjZDRhOkcxMWczei1WTlhlYnhhbEZQQ0N5TQ=="
};

const callbacks = {
  onSrcObjectReady: (stream) => {
    videoElement.srcObject = stream;
  },
  onVideoStateChange: (state) => {
    console.log("Video state:", state);
  },
  onConnectionStateChange: (state) => {
    console.log("Connection state:", state);
  },
  onNewMessage: (messages, type) => {
    console.log("Agent says:", messages);
  },
  onError: (err, data) => {
    console.error("Agent error:", err, data);
  }
};

(async () => {
  const agentManager = await sdk.createAgentManager(agentId, {
    auth,
    callbacks,
    streamOptions: {
      compatibilityMode: "auto",
      streamWarmup: true
    }
  });

  await agentManager.connect();

  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) {
      agentManager.chat(text);
      input.value = "";
    }
  });
})();
