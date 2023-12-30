// to handle surprise prompts and to remove same prompts if there are multiple copies
import { promptList } from "../ImageSize/ImageSize";

// logic to generate the surprise prompt from a list of predefined prompts
export const getSurprisePrompt = (prompt: string): string => {
    const randomIndex = Math.floor(Math.random() * promptList.length);
    const randomPrompt = promptList[randomIndex];

    if(randomPrompt === prompt){
        return getSurprisePrompt(prompt);
    } 

    return randomPrompt || "";
}


interface Identifiable {
    _id: number | string;
}
  
// logic to make sure if the same prompt was provided multiple times, only copy of it will be stored
  export const removeDuplicatedById = <T extends Identifiable>(arr: T[]): T[] => {
    return Object.values(
      arr.reduce((acc, current) => {
        acc[current._id] = current;
        return acc;
      }, {} as Record<string | number, T>)
    );
  };