import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { CREATE_COMPANY_API } from '../utils/constant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ListOfCompany = () => {
    const { companies, filterCompanyByText } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const filterText = companies.length >= 0 && companies.filter((company) => {
            if (!filterCompanyByText) {
                return true
            }
            return company?.name?.toLowerCase().includes(filterCompanyByText.toLowerCase());
        })
        setFilterCompany(filterText);
    }, [filterCompanyByText, companies])

    return (
        <div>
            <Table className="w-full">
                <TableCaption>A list of your Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      filterCompany?.map((c) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={c.logo} alt={`${c.name} logo`} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className='flex items-center gap-2 w-fit cursor-pointer' 
                                            onClick={()=>navigate(`/admin/companies/${c._id}`)}
                                            >
                                                <Edit2 className='w-4' />
                                                <span >Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default ListOfCompany
