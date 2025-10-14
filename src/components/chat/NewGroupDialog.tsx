import React, { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { createGroup } from "@/store/slices/chatSlice"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, X } from "lucide-react"

export const NewGroupDialog: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [name, setName] = useState("")
  const [members, setMembers] = useState<string[]>([])
  const dispatch = useDispatch()
  const { users } = useSelector((s: RootState) => s.chat)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    )
  }, [query, users])

  const addMemberFromInput = (val: string) => {
    const trimmed = val.trim()
    if (!trimmed) return
    const found = users.find(
      (u) => u.email === trimmed || u.name === trimmed
    )
    if (found && !members.includes(found.id))
      setMembers((s) => [...s, found.id])
    setQuery("")
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault()
      addMemberFromInput((e.target as HTMLInputElement).value)
    }
  }

  const removeMember = (id: string) =>
    setMembers((s) => s.filter((m) => m !== id))

  const handleCreate = () => {
    if (!name) return
    dispatch(createGroup({ name, memberIds: members }))
    setName("")
    setMembers([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='w-6 h-6 p-0'>
          <Plus className='w-3 h-3' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Provide a name and add members
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div>
            <Label htmlFor='group-name'>Group name</Label>
            <Input
              id='group-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Group name'
            />
          </div>

          <div>
            <Label>Members</Label>
            <div className='mt-2 border rounded p-2'>
              <div className='flex flex-wrap gap-2 mb-2'>
                {members.map((id) => {
                  const u = users.find((x) => x.id === id)
                  return (
                    <Badge key={id} className='flex items-center gap-2'>
                      {u?.name}
                      <button
                        onClick={() => removeMember(id)}
                        className='ml-1 p-0'
                      >
                        <X className='w-3 h-3' />
                      </button>
                    </Badge>
                  )
                })}
              </div>

              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  className='pl-9'
                  placeholder='Type name or email and press Enter or comma'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                />
              </div>

              {query && (
                <div className='max-h-40 overflow-y-auto mt-2 space-y-1'>
                  {filtered.map((u) => (
                    <div
                      key={u.id}
                      className='p-2 rounded hover:bg-muted cursor-pointer'
                      onClick={() => {
                        if (!members.includes(u.id))
                          setMembers((s) => [...s, u.id])
                      }}
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs'>
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className='text-sm font-medium'>
                            {u.name}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='ghost' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
