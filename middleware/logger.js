

const logger = (store) => (next) => (action) => {
	console.group(action.type);
	console.log("The action: ", action);
	const newState = next(action);
	console.log("The new state: ", store.getState());
	console.groupEnd();
	return newState;
};

export default logger;
