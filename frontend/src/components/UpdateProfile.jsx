import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const UpdateProfile = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNo: user?.phoneNo,
        skills: user?.profile?.skills?.map(skill => skill),
        bio: user?.profile?.bio,
        file: user?.profile?.rsume
    })

    const handlechange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        setInput({
            ...input,
            file
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        const formData = new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email)
        formData.append("phoneNo",input.phoneNo)
        formData.append("bio",input.bio)
        formData.append("skills",input.skills)
        if(input.file){
            formData.append("file",input.file)
        }

        try {
          setLoading(true);
           const res = await axios.post(`https://job-hunt-api.vercel.app/user/profile/update` , formData ,{
                headers:{
                  "Content-Type":"multipart/form-data"
                },
                withCredentials:true
               })

               if(res.data.success){
            dispatch(setUser(res.data.user))
            toast.success(res.data.message)
               }
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
        setOpen(false)

        console.log(input);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Update Profile</DialogTitle>
                    </DialogHeader>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='grid gap-4'>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="name" className="text-right text-gray-700">Full Name</Label>
                                <input type="text" id="name" name='name' value={input.fullname}
                                    onChange={handlechange} className='col-span-3 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="bio" className="text-right text-gray-700">Bio</Label>
                                <input type="text" id="bio" name='bio' value={input.bio} onChange={handlechange} className='col-span-3 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="email" className="text-right text-gray-700">Email</Label>
                                <input type="email" id="email" name='email' value={input.email} onChange={handlechange} className='col-span-3 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="phoneNo" className="text-right text-gray-700">Phone Number</Label>
                                <input type="tel" id="phoneNo" name='phoneNo' value={input.phoneNo} onChange={handlechange} className='col-span-3 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="skills" className="text-right text-gray-700">Skills</Label>
                                <input type="text" id="skills" name='skills' value={input.skills} onChange={handlechange} className='col-span-3 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none' />
                            </div>
                            <div className='grid grid-cols-4 gap-4 items-center'>
                                <Label htmlFor="file" className="text-right text-gray-700">Resume</Label>
                                <input type="file" id="file" name='file' accept="application/pdf" onChange={handleFile} className='col-span-3 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none' />
                            </div>
                        </div>
                        <DialogFooter className="mt-4">
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
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default UpdateProfile
