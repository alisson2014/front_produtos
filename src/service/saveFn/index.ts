import { save } from "service/save";
import Swal from "sweetalert2";

export function saveFn<T>(file: string, data: T, setter: any): void {
  save(file, data).then((res) => {
    if (res?.message) {
      Swal.fire("Sucesso!", res?.message, "success").then((res) => {
        if (res.isConfirmed) {
          setter();
          window.location.reload();
        }
      });
    } else {
      Swal.fire("Erro!", res?.message, "error").then(
        (res) => res.isConfirmed && window.location.reload()
      );
    }
  });
}
