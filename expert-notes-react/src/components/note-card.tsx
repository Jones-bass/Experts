import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function NoteCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left bg-slate-800 flex flex-col p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-300">há 2 dias</span>
        <p className="text-sm leading-6 text-slate-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
          quisquam incidunt dolore culpa, magnam dignissimos explicabo odio illo
          a libero architecto possimus. Repudiandae possimus doloribus inventore
          animi doloremque, earum magni.
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <p className="text-sm leading-6 text-slate-400">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur quisquam incidunt dolore culpa, magnam dignissimos
              explicabo odio illo a libero architecto possimus. Repudiandae
              possimus doloribus inventore animi doloremque, earum magni.
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja{' '}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}