import Swal from "sweetalert2";
import { deleteData } from "../delete";
import { id } from "interface";

export const deleteFn = (
  id: id,
  deleted: string,
  typeData: string,
  file: string
) => {
  Swal.fire({
    title: `Deseja excluir ${deleted}?`,
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, Deletar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteData(file, id).then((res) => {
        if (res?.status) {
          Swal.fire(
            "Deletado!",
            `${typeData} deletada da base de dados.`,
            "success"
          ).then((res) => {
            if (res.isConfirmed) window.location.reload();
          });
        } else {
          Swal.fire("Erro!", "Erro ao deletar na base de dados.", "error").then(
            (res) => {
              if (res.isConfirmed) window.location.reload();
            }
          );
        }
      });
    }
  });
};
