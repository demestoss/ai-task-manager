import type { TaskCategory, TaskPriority } from '@repo/domain/task';

const priorities: TaskPriority[] = ['high', 'low', 'medium', 'useless'];
const categories: TaskCategory[] = ['coding', 'hobby', 'home', 'work', 'other', 'reading'];

export function getTaskPrompt(name: string) {
  return `
    I'm writing todo item for myself for the future

    The available categories are ${categories.join(', ')}
    I'm working as a Frontend dev using React, Typescript at a travel agency

    So based on the title of todo, you should verify what is the category should be applied

    You should also pick the priority based on the todo prompt
    It could be: ${priorities.join(', ')} 
    Make a decision on priority type based on the Eisenhower Matrix
    Set a priority of all asap tasks as urgent and make due date by today if it's morning and tomorrow if it's evening

    The description and name should be also generated based on the todo item title
    The description should be not big, include steps on how to do the task and useful links if possible 
    Please place only useful links related to the task itself, no generic links to the react or ts docs

    The dueDate should be generated if it's possible to estimate the due date based on the todo item title

    The output from you should be the json with fields: name, description, priority, category, dueDate
    Nothing else should be provided except json
    
    The todo prompt is: ${name}
  `;
}
