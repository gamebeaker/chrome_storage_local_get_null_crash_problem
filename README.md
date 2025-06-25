# The problem:

If the data stored in chrome.storage.local is too large `chrome.storage.local.get(null,` crashes chrome. (In my test Data >  1,4GB)

# To reproduce the error:
Clone this repo

Install this addon in Chrome

Click the Addon icon and open dev tools to show the console.

The open Tab should look like this:

![image](https://github.com/user-attachments/assets/cee90e80-973a-41d2-b9f6-1862c0ca4610)

Click "Generate crash" button (it can take a few minutes until chrome crashes)
You can see progress in the console. (Each number represents 100MB)

![image](https://github.com/user-attachments/assets/03c5a3e1-9a7a-46e5-8c80-4333e4fd2385)


After the crash open chrome.

You can test different things now.
- The Button "Generate crash" and "Try to Get all Storage keys, will always crash after first crash" will now crash the browser. (you only have to wait a "short" time after the first crash)
- To test if other storage operations still work you can use "Add 100mb to storage (even after crash)" (They still work)
- With "Clear Storage" all Data in the Storage will be deleted and you can use "Generate crash" again like the first time.
