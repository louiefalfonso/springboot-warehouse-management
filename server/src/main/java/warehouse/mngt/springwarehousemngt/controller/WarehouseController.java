package warehouse.mngt.springwarehousemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.WarehouseDto;
import warehouse.mngt.springwarehousemngt.entity.Warehouse;
import warehouse.mngt.springwarehousemngt.repository.WarehouseRepository;
import warehouse.mngt.springwarehousemngt.service.WarehouseService;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/warehouses")
public class WarehouseController {

    private WarehouseRepository warehouseRepository;
    private WarehouseService warehouseService;

    //POST - Create New Warehouse REST API
    @PostMapping
    public ResponseEntity<WarehouseDto> createNewWarehouse(@RequestBody WarehouseDto warehouseDto){
        WarehouseDto savedWarehouse = warehouseService.createNewWarehouse(warehouseDto);
        return new ResponseEntity<>(savedWarehouse, HttpStatus.CREATED);
    }

    //GET - Get Warehouse By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable ("id") Long id){
        Warehouse warehouse = warehouseRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Warehouse does not exist with Id:" + id));
        return ResponseEntity.ok(warehouse);
    }

    //GET - Get All Warehouse REST API
    @GetMapping
    public ResponseEntity<List<WarehouseDto>> getAllWarehouses(){
        List<WarehouseDto> warehouses = warehouseService.getAllWarehouses();
        return ResponseEntity.ok(warehouses);
    }

    //UPDATE - Update Warehouse REST API
    @PutMapping("{id}")
    public ResponseEntity<Warehouse> updateWarehouse(@PathVariable ("id") long id,
                                                     @RequestBody Warehouse warehouseDetails){
        Warehouse updateWarehouse = warehouseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Warehouse does not exist with id: " + id));

        updateWarehouse.setWarehouseName(warehouseDetails.getWarehouseName());
        updateWarehouse.setWarehouseCode(warehouseDetails.getWarehouseCode());
        updateWarehouse.setOfficeHours(warehouseDetails.getOfficeHours());
        updateWarehouse.setWarehouseLocation(warehouseDetails.getWarehouseLocation());
        updateWarehouse.setWarehouseManager(warehouseDetails.getWarehouseManager());
        updateWarehouse.setContactNumber(warehouseDetails.getContactNumber());
        updateWarehouse.setDescription(warehouseDetails.getDescription());

        warehouseRepository.save(updateWarehouse);
        return ResponseEntity.ok(updateWarehouse);
    }

    //DELETE - Delete Warehouse REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteWarehouse(@PathVariable ("id")  Long warehouseId) {
        warehouseService.deleteWarehouse(warehouseId);
        return ResponseEntity.ok("Warehouse Deleted Successfully");
    }
}

