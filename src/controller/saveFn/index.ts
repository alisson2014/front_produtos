import { method } from "interface";
import { httpRequester } from "service/httpRequester";
import Swal from "sweetalert2";

export function saveFn<T>(
  file: string,
  data: T,
  setter: any,
  method: method
): void {
  httpRequester({ method: method, file: file, data: data }).then((res) => {
    if (res?.status) {
      Swal.fire("Sucesso!", res?.message, "success").then((res) => {
        if (res.isConfirmed) {
          setter();
          window.location.reload();
        }
      });
    } else {
      Swal.fire(
        "Erro!",
        res?.message ?? "Erro ao acessar o servidor",
        "error"
      ).then((res) => res.isConfirmed && window.location.reload());
    }
  });
}
