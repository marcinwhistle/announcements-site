//selectors

//actions
const createActionName = (actionName) => `app/announcements/${actionName}`;

//action creators
const announcementsReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default announcementsReducer;
