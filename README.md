# 🎧 Audio Recorder App

A simple and user-friendly React Native app for recording, playing, and managing audio on both Android and iOS devices.

---

## ✨ Features

- 🎙️ Record high-quality audio
- ▶️ Play, pause, resume, and stop recordings
- 🗂️ Rename, delete, and search recordings
- 📤 Share recordings easily

---

## ⚙️ Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio / Xcode

---

## 🛠️ Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/Kronik502/AudioRecorder.git
   cd audio-recorder-app
Install dependencies:

bash
Copy
Edit
npm install
Link native modules (if needed):

bash
Copy
Edit
react-native link react-native-audio-record
🔐 Permissions
iOS: Add to Info.plist:

xml
Copy
Edit
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your mic to record audio.</string>
Android: Add to AndroidManifest.xml:

xml
Copy
Edit
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
For Android 6.0+, use react-native-permissions for runtime permissions.

🏃 Run the App
iOS:

bash
Copy
Edit
npx react-native run-ios
Android:

bash
Copy
Edit
npx react-native run-android
📱 Usage
🔴 Tap Record to start recording

⏸️ Pause/Resume during recording

⏹️ Tap Stop to save the audio

▶️ Tap on a recording to play

❌ Swipe to rename or delete

📤 Tap share to send your audio

📦 Dependencies
react-native-audio-record

react-native-sound

react-native-permissions

🙌 Contributing
Contributions are welcome!
Fork the repo and submit a pull request.
