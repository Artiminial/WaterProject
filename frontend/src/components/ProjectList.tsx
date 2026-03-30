import {useState, useEffect} from "react";
import type { Project } from '../types/Project';
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../api/ProjectsAPI";

function ProjectList({selectedCategories}: {selectedCategories: string[]}){
const[projects, setProjects] = useState<Project[]>([]);
const [pageSize, setPageSize] = useState<number>(10);
const [pageNum, setPageNum] = useState<number>(1);
const [totalPages, setTotalPages] = useState<number>(0);
const navigate =useNavigate();
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const loadProjects = async() => {
            try{
                setLoading(true);
                const data = await fetchProjects(pageSize, pageNum, selectedCategories);
                setProjects(data.projects);
                setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
            }catch (error){
                setError((error as Error).message);
            }finally{
                setLoading(true);
            }
        };


        loadProjects();
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <div>Loading projects...</div>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return(
        <>
        {projects.map((p) =>
        <div id="projectCard" className="card" key={p.projectId}>
            <h3 className="card-title">{p.projectName}</h3>
                <div className="card-body">
                   <ul className="list-unstyled">
                        <li><strong>Project Type:</strong> {p.projectType}</li>
                        <li><strong>RegionalProgram</strong>: {p.projectRegionalProgram}</li>
                        <li><strong>Impact:</strong> {p.projectImpact} Individuals Served</li>
                        <li><strong>Project Phase: </strong> {p.projectPhase}</li>
                        <li><strong>Project Status: </strong> {p.projectFunctionalityStatus}</li>
                    </ul> 

                    <button className='btn btn-success' onClick={() => navigate(`/donate/${p.projectName} /${p.projectId}`)}>Donate</button>

                </div>
            
        </div>
        
        )}

         <button  disabled={pageNum === 1} onClick={() =>setPageNum(pageNum - 1)}>Previous</button> 
         
         {[...Array(totalPages)].map((_, index) =>(
            <button key={index + 1} onClick={() => setPageNum(index + 1)}  disabled={pageNum === (index + 1)}>{index + 1}</button>
         ))}
        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br></br>
        <label>
            Results per page:
            <select value={pageSize} 
            onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
            }}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </label>
        </>
    );
}

export default ProjectList;