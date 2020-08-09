# Added 
## Packages 
### Dependency
- react-redux
- redux-observable
- redux-persist
- reselect
- axios
- @reduxjs/toolkit

### Dev Dependency
- @types/node
- typescript
- next-compose-plugins
- @next/bundle-analyzer
- @types/react 
- @types/react-dom 
- @types/react-redux

#####** for code syntax check & auto pre-format before commit code **
- eslint 
- eslint-plugin-react
- prettier 
- eslint-config-prettier
- eslint-plugin-prettier
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- lint-staged
- husky
#####** for tests **
- @babel/preset-env
- @babel/preset-react
- babel-jest 
- enzyme 
- enzyme-adapter-react-16
- jest

## Command 
```
yarn analyzer       --> Visualize size of webpack output files with an interactive zoomable treemap
yarn lint           --> run check code syntax
yarn test           --> runn test
yarn test:coverage  
```


## Files

```
__[root]
  /.eslintrc.json       --> eslint config
  /next.config.js       --> next.js config
  /postcss.config.js    --> postcss config
```

# Explanation
## General 
### Project Structure

- For code refactoring, I want to clear the code structure, so firstly I have move both of components and pages folder to /src, I still keep components (1) because I want to make assumption that we have a existed project with a lot feature there, so the code structure refactoring is not affected to current source, base on that we can refactor each a feature time by time until all for project.
- I added Jest to project to support write unit test for project, I think most of project should be implement unit test so it will increase code quality and saving time for testing. (component test spec should have suffix .spec.ts|tsx|js|jsx)
- I added prettier to support auto reformat the code follow the coding eslint rule.
- I added eslint to make sure all developer follow rule for coding.
- We can't fix all coding syntax at a time, so I added lint-staged to project to make sure we check syntax for feature commit only (only check syntax with modified file). 
- I added ability to develop module in both of javascript and typescript language (I prefer typescript rather than javascript es6).
- I added axios and create httpClient and prefer all http request should run with httpClient, it will help us control the logic in/out request global by can control interceptors of axios. (see more at https://levelup.gitconnected.com/enhance-your-http-request-with-axios-and-typescript-f52a6c6c2c8e)
- I added @redux/toolkit to use some hook helper like createEntityAdapter.
- I added redux to this project to make centralize state throughout the app, I put all general setup for redux in /src/redux, and each module (app) will have /redux folder, where I use to define and provide the Action, Reducer, Epic & Selector for App, so module can communication with each other. See more at bellow for module (app) structure:


    -- /src
        |-- apps
            |-- [module-name]    
                |-- components              -> this folder store all component of module
                |-- models                  -> all modal of module place here
                |-- pages                   -> follow best practice of nextjs, we should defined pages in each module and create alias for it in /src/pages (2)
                |-- redux
                    |-- actions             -> all actions of module place here
                    |-- epics               -> side effect of module (use redux-obserable)
                    |-- reduces             -> provide module state for root store(state)
                    |-- selectors           -> see more at https://redux.js.org/recipes/computing-derived-data 
                |-- services                -> all API call to backend should be put here
                [|-- styles                  -> I considering create this folder to keep style for module]
        |-- pages                           -> this is require folder of nextjs where display pages for the app (see more at https://github.com/vercel/next.js/issues/3728#issuecomment-363964953 to know why I don't find a way to put module inside this folder
        |-- redux                           -> store general logic to allow each module register reducer & epics, also provide for the app a store
        
- Ok, basic structure I have setup, now I start refactor code and implement the feature follow requirement for Task. I wil explain solution for each requirement in section bellow. 

### Task Requirements
#### [Requirement #1](/todo-list#1) - Solution Explanation 
- For code structure, I create module name Todo and I move all old components of Todo page to module todo/components, /pages/index.js I put in todo/pages
- Follow the [TaskFlow](./public/TaskFlow.png) I defined 4 actions for module todo (StartAction, DeleteAction, CancelAction & DoneAction), I also added LoadAction & CreateAction to support load/create the Task, all actions are actions of Task so I put to actions/TaskAction.ts. 
- So we have all action relation with Task, how about Todo ? in my view Todo will have 1 Actions at this moment and I called that Action is InitialAction. Why I need this ? Imaging you have context menu module, where it will display the menu list item depend on your page/section you view, so how you know where you are in the page ? simple solution just use epic to listen event from Todo module, if component init and append to the page then fire event create menu list item correspond with the context. so all your code is splitting, right ?
- I created TodoReducer & TaskReducer, TodoReducer will keep the list ids of task in todo list, TaskReducer will keep list object of Task
- I create Selector getTodoTasks use to get task objects list for the page todo.
- I added redux-persist with localStorage to keep the state in browser storage, so when we re-open the app state will not clear.
- Here's sample action lifecycle:
```
[User] 
    -> click Start Task 
    -> dispatch event StartTask 
    -> Task Epic take event StartTask, Reduce update state of Task is Updating, Component get status Updating to lock the UI, prevent duplicate event from User 
    -> Task Epic call Service to update status of Task to In-Process 
    -> Epic fire event StartTaskSuccess if API call success
        -> reduce update state updating to false, and change status of task to new status
        -> component update ui base on new state provided by reducer 
    -> Epick fire event StartTaskFailure if API return fail to call  
        -> call service to notify for user
        -> revert previous state of Task
```
```
Note: each action have 3 states correspond by 3 other Actions - for ex: Start Action will have Start, StartSuccess & StartFailure Action.
```

#### [Requirement #2](/todo-list#2) - Solution Explanation 
- Because we using next.js so I use default API structure of Next.js to develop backend.
- for simple solution at this moment I use sequelize for ORM, and database I choose sqlite. I prefer use ORM because we can change database in future.
- this is simple solution so there're have a few limitation (not sync between client in realtime - need refresh, each time page refresh it will call load again list task from API)
- if we have large project manage complex sync data between online/offline in realtime I prefer use Cloud FireStore for the app.
- Ok, all above I just explain the way I will use. Now we update component in last commit to adapt with this requirement.
1. in todo app, I create TaskService.ts it will manage all the api call between front-end to backend of Task.
2. I modify taskEpic, instead throw new action base on input action, I will call service to retrieve/update data to backend.
 
P/s: you can see the commit change to see how I modified code for solution 2.


# Note
(1) I make assumption old feature run in /task, for root (/) location it will run feature refactored in new structure.
 
## @Todo
- Because I have limited time, so I have not take care a few things:
1. Temporary I have not care about SSR.
2. I also temporary not focus on setup API structure to support API can easy extendable. (Basically I'm not refer build API base on Next.js should use some other framework to build API like loopback4 the config APIEndpoint)
3. Add authentication to protect API
4. fix a bug with reducerRegistry where store make persist data sometime bug.
5. add more test case for other component (right now only add a test case for TaskListItem)
