# Project Information 
[Project URL](https://notes-six-jade.vercel.app/)


------------------------------------------------------------------------------------
- Setting
	1) Create the repository in Github
		- Don't add any files in the created repository
	2) Create the application 
	3) Go to the application folder
	4) Setup Git 
		Run 
```

			- git init 
			- git remote add origin <GIT URL> // connect the folder with a git repository
			- git add . // Add all files into the git repository
			- git commit -m "Commiting all files into the repository" // Commiting files with a message 
			- git push -u origin master
```
		Changes 
```
			- git commit -m "Commiting the branch"
			- git add .
			- git push
```
		Branches
```
			- git branch <BRANCH_NAME> // Creates the branche 
			- git branch // Shows all branches    
			- git checkout -b <BRANCH_NAME> // Switch to the brance 
			- git push origin <BRANCH_NAME> // 
			- git branch -D <BRANCH_NAME> // Delete a branch
```

------------------------------------------------------------------------------------------
- Tailwind 
	https://tailwindcss.com/docs/guides/create-react-app

	1) Installing 
		npm install -D tailwindcss postcss autoprefixer
		npx tailwindcss init -p

	2) Configure your template paths (update tailwind.config.js)
``` json
module.exports = {
			content: [
				"./src/**/*.{js,jsx,ts,tsx}",
			],
			theme: {
				extend: {},
			},
			plugins: [

			],
		}	
```
	3) Add the Tailwind directives to your CSS
```
		@tailwind base;
		@tailwind components;
		@tailwind utilities;
```

	4) Other components to install
```
		npm install @tailwindcss/forms
		npm install @headlessui/react 
		npm install @heroicons/react
```


------------------------------------------------------------------------------------------
- Vercel (https://vercel.com/)




