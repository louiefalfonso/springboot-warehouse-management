package warehouse.mngt.springwarehousemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.InventoryDto;
import warehouse.mngt.springwarehousemngt.entity.Inventory;
import warehouse.mngt.springwarehousemngt.repository.InventoryRepository;
import warehouse.mngt.springwarehousemngt.service.InventoryService;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/inventories")
public class InventoryController {

    private InventoryService inventoryService;
    private InventoryRepository inventoryRepository;

    //POST - Create New Inventory REST API
    @PostMapping
    public ResponseEntity<InventoryDto> createNewInventory(@RequestBody InventoryDto inventoryDto){
        InventoryDto savedInventory = inventoryService.createNewInventory(inventoryDto);
        return new ResponseEntity<>(savedInventory, HttpStatus.CREATED);
    }

    //GET - Get Inventory By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable ("id") Long id){
        Inventory inventory = inventoryRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Inventory does not exist with Id:" + id));
        return ResponseEntity.ok(inventory);
    }

    //GET - Get All Inventories REST API
    @GetMapping
    public ResponseEntity<List<InventoryDto>> getAllInventories(){
        List<InventoryDto> inventories = inventoryService.getAllInventories();
        return ResponseEntity.ok(inventories);
    }


    //UPDATE - Update Inventory REST API
    @PutMapping("{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable ("id") long id,
                                                     @RequestBody Inventory inventoryDetails){
        Inventory updateInventory = inventoryRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Inventory does not exist with id: " + id));

        updateInventory.setInventoryCode(inventoryDetails.getInventoryCode());
        updateInventory.setQuantity(inventoryDetails.getQuantity());
        updateInventory.setValue(inventoryDetails.getValue());
        updateInventory.setLocation(inventoryDetails.getLocation());
        updateInventory.setReorderPoint(inventoryDetails.getReorderPoint());
        updateInventory.setUnitCost(inventoryDetails.getUnitCost());
        updateInventory.setRemarks(inventoryDetails.getRemarks());
        updateInventory.setInventoryManager(inventoryDetails.getInventoryManager());
        updateInventory.setWarehouse(inventoryDetails.getWarehouse());
        updateInventory.setProduct(inventoryDetails.getProduct());

        inventoryRepository.save(updateInventory);
        return ResponseEntity.ok(updateInventory);
    }


    //DELETE - Delete Inventory REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteInventory(@PathVariable ("id") Long inventoryId){
        inventoryService.deleteInventory(inventoryId);
        return ResponseEntity.ok("Inventory Deleted Successfully");
    }

    //GET - Get All Deleted Inventories REST API
    @GetMapping("/deleted")
    public ResponseEntity<List<InventoryDto>> getAllDeletedInventories(){
        List<InventoryDto> deletedInventories = inventoryService.getAllDeletedInventories();
        return ResponseEntity.ok(deletedInventories);
    }


    //GET - Get Deleted Inventory By ID REST API
    @GetMapping("/deleted/{id}")
    public ResponseEntity<InventoryDto> getDeletedInventoryById(@PathVariable ("id") Long id){
        InventoryDto deletedInventory = inventoryService.getDeletedInventoryById(id);
        return ResponseEntity.ok(deletedInventory);
    }
}
