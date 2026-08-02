export function getErrorMessage(errors){
    return Object.values(errors)
            .flat()
            .join("\n");
}