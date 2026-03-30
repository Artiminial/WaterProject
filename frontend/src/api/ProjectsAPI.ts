import type { Project } from "../types/Project";

interface FetchProjectsResponse{
    projects: Project[];
    totalNumProjects: number;

}

export const fetchProjects = async(
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
    try{
    const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join(`&`);

        const response = await fetch(`https://localhost:5000/api/water/AllProjects?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
            );

        if(!response.ok){
            throw new Error('Failed to fetch projects');
        }

    return await response.json();
    } catch (error) {
        console.error("Error Fetching projects:", error);
        throw error;
    }
};