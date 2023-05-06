import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { Title } from '@mantine/core'
import TabHeaderAction from '../../../components/tabHeaderAction'
import { TEST_API_URL } from '../../../util/constants'
import { HiringRoleProcessTable } from '../../../components/admin/HiringRoleProcess/HiringRoleProcessTable'
import { useCallback, useEffect, useState } from 'react'
import { HiringRoleProcessModals } from '../../../components/admin/HiringRoleProcess/HiringRoleProcessModal'
import axios, { AxiosError } from 'axios'
import { Router, useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { Pagination, PaginationProps } from 'antd'

const HiringRoleProcess = () => {
    const [search, setSearch] = useState('')
    const [documents, setDocuments] = useState<any>([]) // use an empty array instead of dummdata when url is fixed
    const [fetching, setFetching] = useState(true)
    const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
    const [selectedDocument, setSelectedDocument] = useState<any>({})
    const router = useRouter()
   
    const [totalCount, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)

    const fetchFunction = useCallback(async (page: number, pageSize: number) => {
        setFetching(true)
        try {
            const p: any = await axios.get(`${TEST_API_URL}/hiring-role-process/get?page=${page}&page_size=${pageSize}`, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })

            setDocuments(p.data)
            setCount(p.data.Meta.total_count)
        } catch (error) {
            const err = error as AxiosError
            if ((err.response?.status as number) === 401) {
                await router.push('/admin/login')
            }
            toast.error('Something went wrong')
        }
        setFetching(false)
    }, [router])


    const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (
        current,
        pageSize
    ) => {
        setPage(1)
        setPageSize(pageSize)
    }

    const handlePaginationChange = (page: number) => {
        setPage(page)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (search == '') {
                await fetchFunction(page, pageSize)
                return
            }
            const response = await axios.get(`${TEST_API_URL}/hiring-role-process/get/${search}`, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })
            setDocuments(response.data)
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setDocuments(null)
            } else {
                toast.error('results not found')
            }
        }
    }


    useEffect(() => {
        void fetchFunction(page, pageSize)
    }, [fetchFunction, page, pageSize])

    return (
        <AdminLayout>
            <Title align={'center'}>Hiring role process</Title>
            <TabHeaderAction
                search={{
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    handleSubmit: handleSubmit,
                }}
                create={{
                    text: 'Create new hiring role process',
                    onClick: () => setModal({ open: true, type: 'create', size: '' }),
                }}
            />

            <section>
                <HiringRoleProcessTable
                    documents={documents}
                    fetching={fetching} //pass fetching instead of false when url is fixed
                    setModal={setModal}
                    setSelectedDocument={setSelectedDocument}
                />
            </section>

            <div>
                <HiringRoleProcessModals
                    modal={modal}
                    setModal={setModal}
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                    fetchFunction={() => fetchFunction(page, pageSize)}
                />
            </div>

            <Pagination
                current={page}
                pageSize={pageSize}
                total={totalCount}
                onChange={handlePaginationChange}
                showSizeChanger
                onShowSizeChange={handlePageSizeChange}
            />
            
        </AdminLayout>
    )
}



export default HiringRoleProcess