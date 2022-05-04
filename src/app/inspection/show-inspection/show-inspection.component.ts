import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
//import { FormsModule } from '@angular/forms';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.scss']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypeList$!:Observable<any[]>;
  inspectionTypeList!:any[];

  // variables (properties)
  modalTitle:string='';
  activateAEInspecComp:boolean=false;
  inspection:any;

  //Map to display data associated with foreign keys
  inspectionTypesMap:Map<number,string> = new Map();

  constructor(private service: InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypeList$ = this.service.getInspectionTypeList();
    this.refreshInspectionTypesMap();
  }
  refreshInspectionTypesMap(){
    this.service.getInspectionTypeList().subscribe(data =>{
      this.inspectionTypeList = data;
      for(let i =0;i<data.length;i++){
        this.inspectionTypesMap.set(this.inspectionTypeList[i].id, this.inspectionTypeList[i].inspectionName);
      }
    })
  }
  modalAdd(){
    this.inspection={
      id:0,
      status:null,
      comments:null,
      inspectionTypeId:null
    }
    this.modalTitle="Add Inspection";
    this.activateAEInspecComp=true;
  }
  modalClose(){
    this.activateAEInspecComp=false;
    this.inspectionList$=this.service.getInspectionList();
  }
  modalEdit(item:any){
    this.inspection=item;
    this.modalTitle="Edit Inspection";
    this.activateAEInspecComp=true;
  }
  delete(item:any){
    if(confirm(`Are you sure you want to delete inspection ${item.id}`)){
      this.service.deleteInspection(item.id).subscribe(res =>{
        var closeModal = document.getElementById('add-edit-modal-close');
        if(closeModal){
          closeModal.click();
        }
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess){
          showDeleteSuccess.style.display="block";
        }
        setTimeout(() => {
          if(showDeleteSuccess){
            showDeleteSuccess.style.display="none";
          }
        }, 4000);
        //this.inspectionList$=this.service.getInspectionList();
      })
    }
  }
}
