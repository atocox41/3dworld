import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { ColumnSort, SortingState } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'
import { Title } from '@mantine/core'

import { AdminLayout } from '../../../components/layouts/AdminLayout'
import TabHeaderAction from '../../../components/tabHeaderAction'
import { TEST_API_URL } from '../../../util/constants'
import Table from '../../../components/Table'
import { useColumns } from '../../../table-columns/admin-invitations'
import CreateOrUpdateAdminInvitationModal from '../../../components/admin/adminInvitations/CreateOrUpdateAdminInvitationModal'
import { AdminInvitation } from '../../../types/AdminInvitation'
import DeleteAdminInvitationModal from '../../../components/admin/adminInvitations/DeleteAdminInvitationModal'

const Admins = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [fetching, setFetching] = useState(false)
  const [modal, setModal] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedAdminInvitation, setSelectedAdminInvitation] =
    useState<AdminInvitation | null>(null)

  const router = useRouter()

  const columns = useColumns({
    edit: useCallback(
      (adminInvitation) => {
        console.log(adminInvitation)
        setModal('edit')
        setSelectedAdminInvitation(adminInvitation)
      },
      [router]
    ),
    remove: useCallback(
      (adminInvitation) => {
        setModal('remove')
        setSelectedAdminInvitation(adminInvitation)
      },
      [router]
    ),
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    await searchAdminInvitation()
  }

  const searchAdminInvitation = useCallback(async () => {
    setFetching(true)
    if (search)
      try {
        const { data } = await axios.get(
          `${TEST_API_URL}/admin-invitation/get`,
          {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
            params: {
              search,
            },
          }
        )
        setUsers(data.Data as [])
      } catch (error) {
        const err = error as AxiosError
        if ((err.response?.status as number) === 401) {
          await router.push('/admin/login')
        }
        toast.error('Something went wrong')
      }
    setFetching(false)
  }, [router])

  const fetchAdminInvitations = useCallback(
    async ({ sort }: { sort?: ColumnSort }) => {
      setFetching(true)
      try {
        const { data } = await axios.get(
          `${TEST_API_URL}/admin-invitation/get`,
          {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
            params: {
              sort: sort?.id,
              order: sort ? (sort.desc ? 'desc' : 'asc') : undefined,
            },
          }
        )
        setUsers(data.Data as [])
      } catch (error) {
        const err = error as AxiosError
        if ((err.response?.status as number) === 401) {
          await router.push('/admin/login')
        }
        toast.error('Something went wrong')
      }
      setFetching(false)
    },
    [router]
  )

  useEffect(() => {
    const [sortField] = sorting
    void fetchAdminInvitations({ sort: sortField })
  }, [fetchAdminInvitations, sorting])

  const refetch = useCallback(async () => {
    const [sortField] = sorting
    void fetchAdminInvitations({ sort: sortField })
  }, [fetchAdminInvitations, sorting])

  return (
    <AdminLayout>
      <Head>
        <title>Admin Invitations</title>
      </Head>

      <div className="mb-8 flex items-center justify-between">
        <Title size={24} align="center" className="text-white">
          Admin Invitations
        </Title>

        <TabHeaderAction
          search={{
            value: search,
            onChange: (e) => setSearch(e.target.value),
            handleSubmit,
          }}
          create={{
            onClick: () => setModal('create'),
            text: 'Add new',
          }}
        />
      </div>

      <section>
        <Table
          loading={fetching}
          columns={columns}
          data={users}
          state={{ sorting }}
          onSortingChange={setSorting}
        />
      </section>

      <CreateOrUpdateAdminInvitationModal
        modal={modal}
        setModal={setModal}
        fetchFunction={refetch}
        selectedAdminInvitation={selectedAdminInvitation}
        setSelectedAdminInvitation={setSelectedAdminInvitation}
      />
      <DeleteAdminInvitationModal
        setModal={setModal}
        modal={modal}
        fetchFunction={refetch}
        selectedAdminInvitation={selectedAdminInvitation}
        setSelectedAdminInvitation={setSelectedAdminInvitation}
      />
    </AdminLayout>
  )
}

export default Admins
