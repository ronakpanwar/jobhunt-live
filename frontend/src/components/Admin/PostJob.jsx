import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOBS_URL_API } from '../utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {

    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate()

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirments: "",
        salary: "",
        location: "",
        experience: "",
        jobType: "",
        position: 0,
        companyId: ""
    })

    const [loading , setLoading] = useState(false);
 
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const selectChangeHandle = (value)=>{
        const selectCompany = companies.find((c)=> c.name.toLowerCase() === value)
        setInput({...input , companyId:selectCompany._id});
    }

   
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`${JOBS_URL_API}/post` , input , {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
    }
     

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={handleSubmit} className='p-8 max-w-4xl border border-gray-200 rounded-md shadow-lg'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input type='text'
                                name='title'
                                value={input.title}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type='text'
                                name='description'
                                value={input.description}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirments</Label>
                            <Input type='text'
                                name='requirments'
                                value={input.requirments}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type='text'
                                name='salary'
                                value={input.salary}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type='text'
                                name='location'
                                value={input.location}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input type='text'
                                name='experience'
                                value={input.experience}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input type='number'
                                name='position'
                                value={input.position}
                                onChange={handleChange}
                                className="focus-visible:ring-offest-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandle}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select A Company " />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                       {
                                        companies?.map((c)=>{
                                            return(
                                                <SelectItem value={c.name.toLowerCase()}>
                                                    {c.name}
                                                </SelectItem>
                                            )
                                        })
                                       }
                                           
                                           
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }

                    </div>
                
                    {loading ? (
                                <button className='w-full flex items-center justify-center px-4 py-2 mt-2 bg-gray-200 text-gray-500 rounded-md' disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full mt-2  px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
                                >
                                 Post New Job
                                </button>
                            )}
                    {
                        companies.length === 0 && <p className="text-xs font-bold text-center mt-2 text-red-600 ">*Please register a company first , Before post job ..</p>
                    }
                </form>
            </div>

        </div>
    )
}

export default PostJob
