# proyect-react

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

# Funcionality of the App

# Components

- CreateElement

-> Main component that contains all the tasks that are accumulated to the corresponding column and also contains the filtering of this.
As parameters it receives states and the functions that I end up taking them to App where I have all the methods to implement the functionality of filtering, display ... We have a bar/menu on the left that allows us to change states between tasks, show/hide and the button create new task that is a route with UseNavigate and a route configured in App.

- CreateView

-> Component or view where we find a form to fill in the necessary data to create a task. Once the data is filled in each field, the object is created and added to the list of states passed by parameter. It also includes data persistence with electron-store.

- EditView

-> Component very similar to CreationView with a form and options to: save, delete or go back if changes have been made. This component, as the statement says edits the task selected by the user and gives the three possibilities mentioned above

- TaskItem

-> Component where we create the tab that will be shown in CreateElement, it has buttons to delete, consult in detail and the edit button that is a route configured in App (Route) that takes us to the edit view (EditView).

- App

-> Component where everything is rendered and with the states and its functions to be able to handle them in the other components.


# Other information

-> In the index.js src/preload we have our api exposed with the functions mainly for handling the tasks if they are going to be updated, deleted or created for our database and also has the function to open dialog for the case of deleting a task.

-> Then in index.js of the /src/main we create handle events for those dispatches that are made in the preload and they will call to their respective function defined in TaskManager that is a class where the methods to manage the database are found.
