import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLY_URL_API } from '../utils/constant'

const setStatus = ["accepted" , "rejected"]
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const handleStatus = async(status , id)=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLY_URL_API}/update/${id}` , {status});
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
           toast.error(error.response.data.message) 
        }
    }
    return (
        <div>

            <Table className="w-full">
                <TableCaption>A list of recent applied User</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contect</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>
                                    {item?.applicant?.fullname}
                                </TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNo}</TableCell>
                                <TableCell>
                                { item.applicant?.profile?.resume ?<a className='text-blue-600 underline' href={item?.applicant?.profile?.resume}>{item?.applicant?.profile?.resumeOrignalName}</a> : <span>NA</span>
                                }</TableCell>
                                <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                             setStatus.map((status , index)=>{
                                                return  <div onClick={()=>{
                                                    handleStatus(status,item?._id)
                                                }}  className='flex flex-col gap-2 cursor-pointer' key={index}>
                                                 <span>{status}</span>
                                                </div>
                                            })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }



                </TableBody>
            </Table>
        </div>

    )
}

export default ApplicantsTable
