interface ElementCountForId {
    _id: string;
    category: string[];
}

interface ElementCount {
    [key: string]: number;
}

export const elementCountForId = (
    array: ElementCountForId[] | null | undefined,
): ElementCount => {
    if (!array) return {};
    const categoryCount: ElementCount = {};

    // Проходимся по каждому объекту во входном массиве
    array.forEach((obj) => {
        // Проходимся по каждой категории в текущем объекте
        obj.category.forEach((categoryId) => {
            if (categoryId !== "" || typeof categoryId === "string") {
                categoryCount[categoryId] =
                    (categoryCount[categoryId] || 0) + 1;
            }
            // Если такой ключ уже существует, увеличиваем его значение на 1, иначе создаем новый ключ
        });
    });

    return categoryCount;
};
