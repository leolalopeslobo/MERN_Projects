Git Commands Quick Notes

###### 1. git commit --amend
```bash
git commit --amend
```

What it does:
- Edits the last commit
- Can change commit message
- Can add/remove files
- Replaces the last commit

Use when:
Forgot to add something or want to fix the last commit

###### 2. git reset --hard HEAD~1
```bash
git reset --hard HEAD~1
```

What it does:
- Deletes the last commit
- Deletes all changes in that commit
- Moves HEAD back by one commit

Warning: This permanently removes changes

Use when:
You want to completely remove the last commit and its changes

###### 3. git rm --cached <file>
```bash
git rm --cached .env
```

```bash
git rm -r --cached <folder_name>
```

What it does:
- Stops tracking the file in Git
- Keeps the file locally on your system
- Works with .gitignore

Use when:
You accidentally added a file (like .env) and don’t want Git to track it