import { deleteData } from "service/delete";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { IDeleteFunction } from "interface";

export const deleteFn = (props: IDeleteFunction, setter: any): void => {
  const { id, deleted, typeData, file } = props;

  const options: SweetAlertOptions = {
    title: `Deseja excluir ${deleted}?`,
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, Deletar!",
    cancelButtonText: "Cancelar",
  };

  const isOk: SweetAlertOptions = {
    title: "Deletado!",
    html: `${typeData} deletada da base de dados.`,
    icon: "success",
  };

  const notOk: SweetAlertOptions = {
    title: "Erro!",
    html: "Erro ao deletar na base de dados.",
    icon: "error",
  };

  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
      deleteData(file, id).then((res) => {
        if (res?.status) {
          Swal.fire(isOk).then((res) => {
            if (res.isConfirmed) {
              setter(null);
              window.location.reload();
            }
          });
        } else
          Swal.fire(notOk).then((res) => {
            res.isConfirmed && window.location.reload();
          });
      });
    }
  });
};
