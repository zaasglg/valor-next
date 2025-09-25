"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface RegisterDialogProps {
  children: React.ReactNode
}

export function RegisterDialog({ children }: RegisterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-2xl m p-0 overflow-hidden">

        <DialogHeader className="bg-green-600 text-white p-4">
          <DialogTitle className="text-white text-xl">Creación de cuenta</DialogTitle>
        </DialogHeader>


        <div className="relative w-full">
          <picture>
            <source srcSet="/images/banner_register_m.png" media="(max-width: 640px)" />
            <img
              src="/images/banner_register.png"
              alt="Bono de hasta 2.000.000 COP por primera vez"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </picture>
        </div>

        <div className="p-6 grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Correo electrónico</label>
            <Input type="email" placeholder="Correo electrónico" className="bg-white shadow-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <Input type="password" placeholder="Contraseña" className="bg-white shadow-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">País</label>
            <Select>
              <SelectTrigger className="w-full bg-white shadow-lg">
                <SelectValue placeholder="Selecciona tu país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Argentina">Argentina</SelectItem>
                <SelectItem value="Bolivia">Bolivia</SelectItem>
                <SelectItem value="Brazil">Brasil</SelectItem>
                <SelectItem value="Chile">Chile</SelectItem>
                <SelectItem value="Colombia">Colombia</SelectItem>
                <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                <SelectItem value="Cuba">Cuba</SelectItem>
                <SelectItem value="Dominican Republic">República Dominicana</SelectItem>
                <SelectItem value="Ecuador">Ecuador</SelectItem>
                <SelectItem value="El Salvador">El Salvador</SelectItem>
                <SelectItem value="Guatemala">Guatemala</SelectItem>
                <SelectItem value="Haiti">Haïti</SelectItem>
                <SelectItem value="Honduras">Honduras</SelectItem>
                <SelectItem value="Mexico">México</SelectItem>
                <SelectItem value="Nicaragua">Nicaragua</SelectItem>
                <SelectItem value="Panama">Panamá</SelectItem>
                <SelectItem value="Paraguay">Paraguay</SelectItem>
                <SelectItem value="Peru">Perú</SelectItem>
                <SelectItem value="Puerto Rico">Puerto Rico</SelectItem>
                <SelectItem value="Uruguay">Uruguay</SelectItem>
                <SelectItem value="Venezuela">Venezuela</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <div className="flex items-end">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 py-3 shadow-lg active:shadow-inner active:translate-y-0.5 transition-all duration-100 border-b-4 border-green-800"
            >
              Abrir cuenta
            </Button>
          </div>

        </div>

        <div className="my-10">
          <p className="text-xs text-center text-gray-600">
            Estoy familiarizado y de acuerdo con <span className="text-blue-600">las condiciones del acuerdo de uso del sitio</span>
          </p>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-t-2xl">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="mb-2 flex justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.17827 5.25726C0.455552 3.73352 3.05504 1.76172 3.71349 1.34357C4.37193 0.925232 5.06523 0.178406 5.06523 0.178406C5.06523 0.178406 5.75847 0.925232 6.41698 1.34357C7.07549 1.76172 9.6751 3.73352 9.95232 5.25726C10.2295 6.78082 9.25902 8.2746 7.56072 8.3642C7.56072 8.3642 6.41667 8.4848 5.5656 7.73505C5.83476 8.33624 6.25475 9.01617 6.91069 9.68933V9.98035H5.06535H3.2199V9.68933C3.87578 9.01617 4.29582 8.33612 4.56487 7.73492C3.71398 8.4848 2.56975 8.3642 2.56975 8.3642C0.871446 8.2746 -0.0990131 6.78082 0.17827 5.25726ZM16.6981 10.1588C16.6981 10.1588 18.8409 6.73206 21.9706 5.07941C18.8409 3.4267 16.6981 0 16.6981 0C16.6981 0 14.5553 3.4267 11.4258 5.07941C14.5553 6.73206 16.6981 10.1588 16.6981 10.1588ZM7.62724 12.8953C7.62724 12.8953 5.88365 12.7112 5.06535 14.1836C4.24687 12.7112 2.50334 12.8953 2.50334 12.8953C0.759874 12.9874 -0.236464 14.5209 0.0482037 16.085C0.332811 17.6493 3.00151 19.6736 3.67754 20.103C4.35356 20.5323 5.06535 21.2991 5.06535 21.2991C5.06535 21.2991 5.77702 20.5323 6.45293 20.103C7.12901 19.6736 9.79765 17.6493 10.0824 16.085C10.367 14.5209 9.37077 12.9874 7.62724 12.8953ZM19.4645 16.0617C19.1429 16.0617 18.8126 16.108 18.4946 16.1941C18.959 15.6904 19.2339 15.0082 19.2339 14.3726C19.2339 13.1655 18.0987 12.187 16.6982 12.187C15.2977 12.187 14.1625 13.1655 14.1625 14.3726C14.1625 15.0223 14.5331 15.7207 15.0937 16.2274C14.7164 16.0897 14.3168 16.012 13.932 16.012C12.5315 16.012 11.3963 16.9905 11.3963 18.1977C11.3963 19.4047 12.5315 20.3834 13.932 20.3834C14.771 20.3834 15.6802 20.0498 16.2745 19.5231C16 20.1816 15.5508 20.9444 14.8157 21.6987V22H16.727H18.6384V21.6987C17.8974 20.9384 17.4473 20.1698 17.1734 19.5077C17.7598 20.0602 18.641 20.433 19.4645 20.433C20.8648 20.433 22 19.4545 22 18.2473C22 17.0401 20.8648 16.0617 19.4645 16.0617Z" fill="#ffffff"></path>
                </svg>
              </div>
              <p className="text-xs">¡Obtén un 650% en <br /> apuestas!</p>
            </div>
            <div>
              <div className="mb-2 flex justify-center">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.12878 14H11.8713H12.5643H18L16.4096 4.00003H12.0643H11.5101H7.71899H7.16486H2.81958L1 14H6.43561H7.12878ZM15.9587 4.7117L17.2036 13.2882H12.5288L12.0999 4.7117H15.9587ZM7.67694 4.7117H11.5359L11.8456 13.2882H7.17072L7.67694 4.7117ZM3.25403 4.7117H7.11298L6.48755 13.2882H1.81274L3.25403 4.7117ZM3.77863 6.27872H6.13171L6.06866 6.93777L4.13306 11.2596H3.17792L5.14911 7.17526L5.15088 7.16H3.64331L3.77863 6.27872ZM10.7089 6.27872L10.72 6.93777L9.27087 11.2596H8.31586L9.82721 7.17526L9.82727 7.16H8.31976L8.35583 6.27872H10.7089ZM12.9962 7.16L12.933 6.27872H15.2861L15.3715 6.93777L14.4088 11.2596H13.4538L14.5054 7.17526L14.5038 7.16H12.9962ZM18 15H1V19L0 20V24H0.846069H18.1539H19V20L18 19V15ZM13 19H6V17H13V19ZM21 14L22 15V17H19V15L20 14L19.8539 6.70389C19.288 6.47653 18.8882 5.93546 18.8882 5.30057C18.8882 4.46127 19.5848 3.78098 20.4441 3.78098C21.3034 3.78098 22 4.46127 22 5.30057C22 5.93546 21.6003 6.47653 21.0343 6.70389L21 14ZM8.18549 3.00003H3.17792L3.4856 2.20975C4.00098 0.885956 5.38708 3.05176e-05 6.94275 3.05176e-05H9.44995H9.51794H12.0252C13.5809 3.05176e-05 14.9669 0.885956 15.4823 2.20975L15.79 3.00003H11.0002H9.51562H9.45239H8.18549Z" fill="#ffffff"></path>
                </svg>
              </div>
              <p className="text-xs">¡Obtén un 650% en <br /> el casino!</p>
            </div>
            <div>
              <div className="mb-2 flex justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 3.07056V4.92938C22 6.62238 20.7173 7.99994 19.1407 7.99994H18.8402C18.8402 7.99994 16.8432 6.00653 16.829 5.95288H19.1407C19.6663 5.95288 20.0938 5.49377 20.0938 4.92938V3.07056C20.0938 2.50616 19.6663 2.04706 19.1407 2.04706H2.85925C2.33368 2.04706 1.90619 2.50616 1.90619 3.07056V4.92938C1.90619 5.49377 2.33368 5.95288 2.85925 5.95288L5.76776 5.85663C5.74927 5.9162 3.28735 7.99994 3.28735 7.99994H2.85925C1.28271 7.99994 0 6.62238 0 4.92938V3.07056C0 1.37756 1.28271 0 2.85925 0H19.1407C20.7173 0 22 1.37756 22 3.07056ZM10.7281 15.0524C10.0745 15.0524 9.4812 14.8761 9.05817 14.683L8.75635 15.6653C9.13873 15.8502 9.79242 16.0012 10.467 16.0264V16.8239H11.453V15.9677C12.6097 15.7996 13.2437 15.1616 13.2437 14.4142C13.2437 13.6586 12.7611 13.1968 11.5633 12.8442C10.7085 12.5755 10.3563 12.3991 10.3563 12.1221C10.3563 11.887 10.5673 11.652 11.2212 11.652C11.9457 11.652 12.4085 11.845 12.6705 11.9374L12.962 10.9885C12.63 10.8542 12.1772 10.7367 11.5031 10.7115V9.97266H10.5172V10.7703C9.44061 10.9466 8.81659 11.526 8.81659 12.2648C8.81659 13.0792 9.55145 13.4991 10.6279 13.8013C11.3726 14.0111 11.6942 14.2126 11.6942 14.5318C11.6942 14.8677 11.3021 15.0524 10.7281 15.0524ZM20.0147 12.5864C20.0539 12.8716 20.0748 13.1614 20.0748 13.4553C20.0748 13.7491 20.0539 14.0389 20.0147 14.3242C20.0052 14.3927 19.9811 14.4572 19.9695 14.5251C19.902 18.6624 15.8976 22 10.9611 22C5.98242 22 1.94635 18.6063 1.94635 14.4201C1.94635 14.2967 1.95898 14.176 1.96655 14.0543C1.94757 13.8557 1.92517 13.6578 1.92517 13.4553C1.92517 13.1614 1.94604 12.8716 1.98529 12.5864C2.18304 11.1483 2.86517 9.8313 3.89221 8.75256C4.32532 8.29767 4.81958 7.88519 5.36469 7.5238C6.65735 6.66675 8.23541 6.09747 9.9588 5.93243C10.3006 5.89966 10.6479 5.88226 11 5.88226C11.3521 5.88226 11.6993 5.89966 12.0411 5.93243C13.7645 6.09747 15.3427 6.66675 16.6353 7.5238C17.1804 7.88519 17.6747 8.29767 18.1077 8.75256C19.1348 9.8313 19.8169 11.1483 20.0147 12.5864ZM3.03375 14.3242C3.22058 15.5237 3.78912 16.6246 4.63367 17.5393L6.05933 16.3495C5.55823 15.7556 5.20679 15.0676 5.05133 14.3242H3.03375ZM6.11182 14.3242C6.24097 14.8307 6.48059 15.3036 6.80872 15.7242C7.19116 16.2145 7.6936 16.6339 8.28113 16.953C8.78522 17.2267 9.35175 17.4268 9.9588 17.5345C10.2948 17.5942 10.643 17.6259 11 17.6259C11.3569 17.6259 11.7051 17.5942 12.0411 17.5345C12.6482 17.4268 13.2148 17.2267 13.7188 16.953C14.3064 16.6339 14.8088 16.2145 15.1913 15.7242C15.5193 15.3036 15.759 14.8307 15.8881 14.3242C15.9597 14.0438 15.9976 13.7532 15.9976 13.4553C15.9976 13.1574 15.9596 12.8668 15.8881 12.5864C15.759 12.0798 15.5193 11.6071 15.1912 11.1864C14.8088 10.6961 14.3064 10.2768 13.7188 9.95764C13.2148 9.68384 12.6482 9.48383 12.0411 9.37604C11.7051 9.31641 11.3569 9.28479 11 9.28479C10.643 9.28479 10.2948 9.31641 9.9588 9.37604C9.35175 9.48383 8.78522 9.68384 8.28113 9.95764C7.6936 10.2768 7.19116 10.6961 6.80872 11.1864C6.48059 11.6071 6.24097 12.0798 6.11182 12.5864C6.04034 12.8668 6.00244 13.1574 6.00244 13.4553C6.00244 13.7532 6.04034 14.0438 6.11182 14.3242ZM16.9486 14.3242C16.7932 15.0676 16.4418 15.7556 15.9406 16.3495L17.3663 17.5393C18.2109 16.6246 18.7794 15.5237 18.9662 14.3242H16.9486ZM6.10608 18.7681C7.20221 19.4728 8.52136 19.9473 9.9588 20.1032V18.4195C9.06793 18.2897 8.24353 17.9965 7.53174 17.5783L6.10608 18.7681ZM12.0411 20.1032C13.4786 19.9473 14.7977 19.4728 15.8939 18.7681L14.4682 17.5783C13.7564 17.9965 12.9321 18.2897 12.0411 18.4195V20.1032ZM17.3663 9.37134L15.9406 10.561C16.4418 11.155 16.7932 11.843 16.9486 12.5864H18.9662C18.7794 11.3868 18.2109 10.286 17.3663 9.37134ZM12.0411 6.80737V8.49109C12.932 8.62085 13.7564 8.91406 14.4682 9.33228L15.8939 8.14258C14.7977 7.43774 13.4786 6.96332 12.0411 6.80737ZM6.10614 8.14258L7.5318 9.33228C8.24353 8.91406 9.06793 8.62085 9.9588 8.49109V6.80737C8.52136 6.96332 7.20221 7.43774 6.10614 8.14258ZM3.03375 12.5864H5.05133C5.20685 11.843 5.55823 11.155 6.05933 10.561L4.63367 9.37134C3.78912 10.286 3.22058 11.3868 3.03375 12.5864Z" fill="#ffffff"></path>
                </svg>
              </div>
              <p className="text-xs">¡Obtén hasta un <br /> 30% de reembolsos!</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <span>¿Ya tiene cuenta?</span>
          <span className="text-white font-bold">Ingresar →</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}