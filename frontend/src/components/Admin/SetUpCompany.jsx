import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowBigLeftIcon, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { CREATE_COMPANY_API } from '../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const SetUpCompany = () => {
    const params = useParams()
    useGetCompanyById(params.id);

    const {singleCompany} = useSelector(store=>store.company);
    
    const navigate = useNavigate()
    const [loading , setLoading]  = useState(false)

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleChangeImage = (e) => {
        const file = e.target.files?.[0];
        setInput({
            ...input,
            file
        })
    }

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("name",input.name)
      formData.append("description",input.description)
      formData.append("website",input.website)
      formData.append("location",input.location)
      if(input.file){
        formData.append("file",input.file)
      }
      
      try {
        setLoading(true);
        const res = await axios.put(`${CREATE_COMPANY_API}/update/${params.id}` , formData ,  {
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        });
        if(res?.data?.success){
            toast.success(res.data.message);    
            navigate('/admin/companies');
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
      }
      finally{
        setLoading(false);
      }

    }

    useEffect(()=>{

        setInput({
            name:singleCompany.name || "",
            description:singleCompany.description || "",
            website:singleCompany.website || "",
            location:singleCompany.location || "",
            file: null
        })

    },[singleCompany])

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form  onSubmit={handleSubmit}>
                    <div className=' flex gap-10'>

                        <Button variant='outline' onClick={()=> navigate(`/admin/companies`)} className="flex gap-5 p-4 items-center " >
                            <ArrowBigLeftIcon  />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl'>Company SetUp</h1>
                    </div>
                    <div className='flex flex-col gap-4 my-10'>
                        <div>
                            <Label>Company Name</Label>
                            <Input type='text' name='name' value={input.name} onChange={handleChange} />
                        </div>

                        <div><Label>Description</Label>
                            <Input type='text' name='description' value={input.description} onChange={handleChange} /></div>

                        <div>    <Label>Website</Label>
                            <Input type='text' name='website' value={input.website} onChange={handleChange} /></div>


                        <div> <Label>Location</Label>
                            <Input type='text' name='location' value={input.location} onChange={handleChange} />
                        </div>

                        <div>        <Label>Logo</Label>
                            <Input type='file' accept='image/*' onChange={handleChangeImage} /></div>
                    </div>


                    <div>

                    </div>
                    {loading ? (
                                <button className='w-full flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-500 rounded-md' disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
                                >
                                    Update 
                                </button>
                            )}
                        
                </form>

            </div>

        </div>
    )
}

export default SetUpCompany
