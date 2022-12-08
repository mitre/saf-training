import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{d as t}from"./app.3b4d192a.js";const i={},o=t("<p><strong>Suggested Resources to start on (Simple):</strong></p><ul><li>Docker <ul><li><code>id</code> retrieves container id</li><li><code>image</code> retrieves image name</li><li><code>repo</code> retrieves the repo</li><li><code>tag</code> retrieves the tag</li><li><code>ports</code> retrieves the ports</li><li><code>command</code> retrieves command</li></ul></li><li>Git <ul><li><code>branches</code> checks if branch exists</li><li><code>current_branch</code> retrieves current branch</li><li><code>last_commit</code> retrieves last commit from log</li><li><code>git_log</code> retrieve log of all commits</li><li><code>tag</code> retrieve tag for repo</li></ul></li></ul><p><strong>Suggested Resources to start on (Medium):</strong></p><ul><li>File resource <ul><li><code>owner</code> tests if the owner of the file matches the specified value.</li><li><code>group</code> tests if the group to which a file belongs matches the specified value.</li><li><code>size</code> tests if a file\u2019s size matches, is greater than, or is less than the specified value.</li><li><code>contents</code> tests if contents in the file match the value specified in a regular expression.</li><li><code>path</code> retrieves path to file</li></ul></li><li>Directory resource <ul><li><code>owner</code> tests if the owner of the file matches the specified value.</li><li><code>group</code> tests if the group to which a file belongs matches the specified value.</li><li><code>size</code> tests if a file\u2019s size matches, is greater than, or is less than the specified value.</li><li><code>contents</code> tests if contents in the file match the value specified in a regular expression.</li><li><code>path</code> retrieves path to directory</li></ul></li><li>Users <ul><li><code>exist</code> tests if the named user exists</li><li><code>gid</code> tests the group identifier</li><li><code>group</code> tests the group to which the user belongs</li><li><code>groups</code> tests two (or more) groups to which the user belongs</li><li><code>home</code> tests the home directory path for the user</li><li><code>maxdays</code> tests the maximum number of days between password changes</li><li><code>mindays</code> tests the minimum number of days between password changes</li><li><code>shell</code> tests the path to the default shell for the user</li><li><code>uid</code> tests the user identifier</li><li><code>warndays</code> tests the number of days a user is warned before a password must be changed</li></ul></li><li>etc host allow/deny <ul><li><code>daemon</code> daemon returns a string containing the daemon that is allowed in the rule.</li><li><code>client_list</code> client_list returns a 2d string array where each entry contains the clients specified for the rule.</li><li><code>options</code> options returns a 2d string array where each entry contains any options specified for the rule.</li></ul></li></ul><p><strong>Suggested Resources to start on (Hard):</strong></p><ul><li>etc shadow <ul><li><code>users</code> A list of strings, representing the usernames matched by the filter</li><li><code>passwords</code> A list of strings, representing the encrypted password strings for entries matched by the where filter. Each string may not be an encrypted password, but rather a * or similar which indicates that direct logins are not allowed.</li><li><code>last_changes</code> A list of integers, indicating the number of days since Jan 1 1970 since the password for each matching entry was changed.</li><li><code>min_days</code> A list of integers reflecting the minimum number of days a password must exist, before it may be changed, for the users that matched the filter.</li><li><code>max_days</code> A list of integers reflecting the maximum number of days after which the password must be changed for each user matching the filter.</li><li><code>warn_days</code> A list of integers reflecting the number of days a user is warned about an expiring password for each user matching the filter.</li><li><code>inactive_days</code> A list of integers reflecting the number of days a user must be inactive before the user account is disabled for each user matching the filter.</li><li><code>expiry_dates</code> A list of integers reflecting the number of days since Jan 1 1970 that a user account has been disabled, for each user matching the filter. Value is nil if the account has not expired.</li><li><code>count</code> The count property tests the number of records that the filter matched.</li></ul></li><li>etc fstab <ul><li><code>device_name</code> is the name associated with the device.</li><li><code>mount_point</code> is the directory at which the file system is configured to be mounted.</li><li><code>file_system_type</code> is the type of file system of the device or partition.</li><li><code>mount_options</code> is the options for the device or partition.</li><li><code>dump_options</code> is a number used by dump to decide if a file system should be backed up.</li><li><code>file_system_options</code> is a number that specifies the order the file system should be checked.</li></ul></li><li>Tomcat server conf reader <ul><li><code>parse_conf</code> parse the conf file</li><li><code>fetch_connectors</code> retrieves keys <code>port</code>, <code>protocol</code>, <code>timeout</code>, <code>redirect</code>, <code>sslprotocol</code>, <code>scheme</code>, <code>sslenable</code>, <code>clientauth</code>, <code>secure</code></li></ul></li></ul>",6);function s(c,r){return o}var a=e(i,[["render",s],["__file","12.html.vue"]]);export{a as default};
