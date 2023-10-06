User Manual for Vulcan 
(to create a STIG for an app that doens't have one)

This guide assumes that the user is loged into the website: vulcan.mitre.org

1. At the top of the page, click the "SRGs" button.
[screenshot]
You'll need to decide which high level guidance you want to base your STIG off of. Or you can upload your own, as long as it's in XCCDF format or an XML document.
1a. For this manual, the "Application_Security_Development_STIG" is going to be chosen. [screenshot?]

2. At the top of the page, click the "Start New Project" button. [screenshot] 
Name your project, give it a description, and choose the visibility.
2a. Once your project has been created, there's a tab titled "Members" where you can add users to your project, and assign them a role.

3. Go to the "Components" tab on the page, if you're not already there, and click "Create a New Component"
Here, you'll select the SRG of your choice, name the component, enter the version and release, a STIG ID Prefix, and a title. 
3a. You can also enter a description, a PoC, and a Slack Channel ID if you want.
[screenshot]
Click "Create Component" once you're done.
[screenshot]

4. After the component has been created, click the "Open Component" button. [screenshot]
The page should look something like this:
[screenshot]
4a. On the left side of the page, scroll down a little, and there is a section titled "All Controls". These are all of the controls in the SRG chosen, and you can tailor them for your application. [screenshot]

5. If you want to make any changes/edits to the controls, click the "Edit Component Control" button at the top. For each control, its status can be updated (maybe write them out and define them? yt vid ts: 24:26)
WRITE IT OUT

6. Next, for the controls that are applicable, you can click the tab that says "InSpec Control Body" and write an automated validation test for the control.
[screenshot]
As an example, control MYCO-00-00001 requires that the application must limit the number if logon sessions per user. The test written in the example will parse through a file called "session.conf" and make sure that the max_logon_sessions variable/input is set to a value. In this example, it is set to 5.

7. Once you are done with writing a test, be sure to click the "Save Control" button at the top.
You can also see that the control changes were saved by looking on the right side of the page, under "Revision History". To see the entire control, with the documentation and InSpec test, click the tab that says "InSpec Control (Read Only)"

Other important things to note: