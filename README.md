# Reaper

A Chrome extension designed to actively keep you off unproductive websites with gentle reminders of your mortality.

![](https://media.discordapp.net/attachments/992812563870003230/1136154381859946578/image.png?width=462&height=540)

## Functionality

- Keeps track of how much time you spend on blacklisted websites
- Keeps track of approximately how much time you have left in your life
- Notifies you of your mortality when you visit a blacklisted website
- Ability to edit the blacklist

![](https://cdn.discordapp.com/attachments/992812563870003230/1136157640129527838/image.png)

## Building from source

Make sure you have Node installed, because you'll be running:

```sh
npm install
```

This project uses Vite, so run:

```sh
npx vite build
```

You'll see that a `dist/` directory has been created. This is the directory you'll use to load the extension.
