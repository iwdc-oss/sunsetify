## How to clone (recommended)

```
# Clone this repository with new repository name
git clone https://github.com/nurulakbaral/boilerplate-setup-nextjs.git <new_repository_name>

# Enter into this repository
cd <new_repository_name>

# Check out to a temporary branch:
git checkout --orphan <temp_branch_name>

# Add all the files:
git add -A

# Commit the changes:
git commit -am <commit_message>

# Delete the old branch (master/main):
git branch -D <old_branch_name>

# Rename the temporary branch to master/main:
git branch -m <new_branch_name>

# Check your remote repositories (origin):
git remote -v

# If they exist, remove (all) your remote repositories (origin):
git remote rm <remote_name>

# Install the dependencies with Yarn:
yarn install

# Run your project:
yarn dev
```
