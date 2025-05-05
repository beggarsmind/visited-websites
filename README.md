# Visited Website Tracker Extension

## **Introduction**
The **Visited Website Tracker** Chrome extension allows users to track and manage the websites they visit. It provides a list of visited websites, enables you to search, clear the history, and download the list of websites in a `.txt` format.

---

## **Installation Instructions**

### **1. Download the Extension**

1. **Clone the Repository**:
   If you prefer to clone the repository to your local machine, open your terminal and run the following command:
   ```bash
   git clone https://github.com/beggarsmind/visited-website-tracker.git
Alternatively, you can download the repository as a ZIP file:

Go to the Visited Website Tracker repository.

Click on the green Code button and select Download ZIP.

### **2. Install the Extension Locally**
Once you have downloaded the repository, follow these steps to load the extension in Chrome:

Open Chrome and go to the Extensions page:

Click on the three dots (menu) in the top-right corner of Chrome.

Select More tools > Extensions.

Enable Developer Mode:

In the Extensions page, toggle the Developer mode switch to ON (at the top-right).

Load Unpacked Extension:

Click on the Load unpacked button.

Select the folder where you cloned or extracted the repository (the folder containing the manifest.json file).

This will install the extension locally on your Chrome browser.

### **3. Testing the Extension**
Once the extension is installed, you will see the Visited Website Tracker icon in the top-right of the Chrome toolbar.

Click on the icon to open the popup where you can see the list of visited websites.

The extension will automatically track the websites you visit and display them in the list.

### **How to Use the Extension**
Viewing Visited Websites:

Click on the extension icon to open the popup.

A list of visited websites will appear with the total count at the top.

### **Searching Visited Websites:**

Use the Search bar in the popup to filter the list of websites. As you type, the list will update based on the search query.

### **Clearing History:**

Click on the Clear History button to remove all the websites from the list.

### **Downloading Website History:**

To download the visited websites as a .txt file, click on the Download as Txt File button.

The file will be downloaded to your default download folder with the filename visited_websites_<current_date>.txt.

### **Permissions Requested**
The extension requires the following permissions to function:

Storage: Used to store the list of visited websites in your local storage.

Web Navigation: Monitors the websites you visit and tracks them in real-time.

Active Tab: To display the extension when interacting with the active tab.

Host Permissions (<all_urls>): To allow the extension to track websites across all URLs.

Troubleshooting**
If the extension is not tracking websites correctly:

Ensure that you have not disabled permissions for the extension.

Check your Chrome settings to ensure background scripts are enabled for extensions.

If the list of websites does not update immediately:

Refresh the page or reopen the extension popup.

### **Contributing**
If you'd like to contribute to the development of this extension, feel free to fork the repository, make your changes, and submit a pull request.

### **License**
This project is licensed under the MIT License - see the LICENSE file for details.
