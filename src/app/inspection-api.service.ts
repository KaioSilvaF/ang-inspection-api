import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {
  readonly inspectionAPIUrl ="https://localhost:7142/api";

  constructor(private http:HttpClient) {}

  //METHODS FOR INSPECION
    //GET
    getInspectionList():Observable<any[]>{
      return this.http.get<any>(this.inspectionAPIUrl+'/inspections');
    }
    //POST
    addInspection(data:any){
      return this.http.post(this.inspectionAPIUrl+'/inspections', data);
    }
    //UPDATE
    updateInspection(id:number|string , data:any){
      return this.http.put(this.inspectionAPIUrl+'/inspections/'+id, data);
    }
    //DELETE
    deleteInspection(id:number|string){
      return this.http.delete(this.inspectionAPIUrl+'/inspections/'+id);
    }
  
  //METHODS FOR INSPECTION TYPE
    //GET
    getInspectionTypeList():Observable<any[]>{
      return this.http.get<any>(this.inspectionAPIUrl+'/inspectiontypes');
    }
    //POST
    addInspectionType(data:any){
      return this.http.post(this.inspectionAPIUrl+'/inspectiontypes',data);
    }
    //UPDATE
    updateInspectionType(id:number|string , data:any){
      return this.http.put(this.inspectionAPIUrl+'/inspectiontypes/'+id, data);
    }
    //DELETE
    deleteInspectionType(id:number|string){
      return this.http.delete(this.inspectionAPIUrl+'/inspectiontypes/'+id);
    }

  //METHODS FOR INSPECTION STATUS
    //GET
    getStatusList():Observable<any[]>{
      return this.http.get<any>(this.inspectionAPIUrl+'/status');
    }
    //POST
    addStatus(data:any){
      return this.http.post(this.inspectionAPIUrl+'/status',data);
    }
    //UPDATE
    updateStatus(id:number|string , data:any){
      return this.http.put(this.inspectionAPIUrl+'/status/'+id, data);
    }
    //DELETE
    deleteStatus(id:number|string){
      return this.http.delete(this.inspectionAPIUrl+'/status/'+id);
    }
}
