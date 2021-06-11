<template>
<!--
  <div className="card">
      <h3 className="card-header text-center font-weight-bold text-uppercase py-4">USUARIOS</h3>
      <div className="card-body">
        <div id="table" className="table-editable">
        <span className="table-add float-right mb-3 mr-2">
          <a className="btn btn-primary" @click="registrar()"REGISTRAR</a>
        </span>
          <table className="table table-bordered table-responsive-md table-striped text-center" >
            <thead>
            <tr>
              <th className="text-center">Nombre</th>
              <th className="text-center">Apellidos</th>
              <th className="text-center">Usuario</th>
              <th className="text-center">Acciones</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="user in usuarios" :key="user.id">
                <td>
                  <span>{usuarios.nombres}</span>
                </td>
                <td>
                  <span>{usuarios.apellidos}</span>
                </td>
                <td>
                  <span>{usuarios.usuario}</span>
                </td>
                <td>
                  <button className="btn btn-success m-1" type="button" @click="editar()">Editar</button>
                  <button className="btn btn-danger m-1" type="button" @click="eliminar()">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
          </div>
        </div>
      </div>
    </div>
-->
    <div className="card">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">USUARIOS</h3>
        <div className="card-body">
            <span className="table-add float-right mb-3 mr-2">
                <!--<a className="btn btn-primary" @click="registrar()">REGISTRAR</a>-->
                <Button type="button" label="REGISTRAR"  @click="registrar()"></Button>
            </span>
            <DataTable :value="usuarios" :paginator="true" :rows="20">
                <Column field="nombres" header="Nombres"></Column>
                <Column field="apellidos" header="Apellidos"></Column>
                <Column field="usuario" header="Usuario"></Column>
                <Column :rowEditor="true" style="width: 10%; min-width:8rem" bodyStyle="text-align:center"></Column>
                <Column header="Acciones" bodyStyle="text-align: center; overflow: visible">
                    <template #body>
                        <Button type="button" label="EDITAR" class="p-button-success"  @click="editar()"></Button>
                        <Button type="button" label="ELIMINAR" class="p-button-danger" @click="eliminar()"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import UsuarioService from '../@services/usuario/index';

export default {
    name:'Home',
    props: {
        msg: String
    },
    data() {
        return {
        usuarios: [],
        
        }
    },
    usuarioService:null,

    created(){
        this.usuarioService=new UsuarioService();
    },
    mounted() {
        this.usuarioService.getListar(1000,1)
            .then(resp => {
                console.log('resp ', resp);
                console.log('resp ', resp.data);
                console.log('resp ', resp.data.data);
                console.log('resp ', resp.data.data.data);
                //temp=resp.data.data.data;
                console.log('usuarios ', this.usuarios);
                this.usuarios=resp.data.data.data;
                //console.log('temp ', temp);
                console.log('usuarios ', this.usuarios);
        })
    },

    methods: {
        editar() {

        },
        eliminar() {

        },
        registrar(){

        }
    }
}
</script>
