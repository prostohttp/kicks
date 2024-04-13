export const prepareDataToDatabase = <T extends Record<string, any>>(
	data: T
): T => {
	const newData: { [key: string]: any } = {};
	for (const [key, value] of Object.entries(data)) {
		if (typeof value === "string") {
			newData[key] = value!.toLowerCase().trim();
		} else {
			newData[key] = value;
		}
	}
	return { ...newData } as T;
};

export const clearString = (data: string): string => {
	return data.toLowerCase().trim();
};
