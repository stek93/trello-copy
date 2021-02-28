# Instructions & installation

In order for this project to run smoothly you'll have to create file in the root of this project (in the same level as src folder, for example) called **.env** and put two variables inside of it.
Variables should be named **REACT_APP_TRELLO_API_KEY** and **REACT_APP_TRELLO_TOKEN**.
Put api key and token inside these variables in next format - **REACT_APP_TRELLO_API_KEY=12345**.

# NOTE
This project isn't completed and it probably won't be due to the lack of time. I created this only to show some basic React concepts.
Unfortunately, I didn't have enough time to devote to this project. So solution is not looking very good.
What could be done better: separation of concerns (I've created useBoards hook for almost everything related to the API, instead of creating more hooks related to certain domains), some menu items are not implemented (such as search and boards). I wanted for search to have it's own page for results (if you click on arrow in the bar) or to show results in some sort of dropdown menu.
Also, regarding task requirements I didn't implement moving cards to list. I was under assumption that I need to implement movement between lists (so that works) and re-ordering cards that should also work.
One more thing, when I implemented 'delete action' I should have shown some warning dialog, but unfortunately, time wasn't on my side.
