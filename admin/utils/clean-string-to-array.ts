export default (str: string): string[] => {
	return str
		.trim()
		.split(",")
		.map((el) => el.trim());
};
