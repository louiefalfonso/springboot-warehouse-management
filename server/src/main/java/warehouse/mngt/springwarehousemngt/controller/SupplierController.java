package warehouse.mngt.springwarehousemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.SupplierDto;
import warehouse.mngt.springwarehousemngt.entity.Supplier;
import warehouse.mngt.springwarehousemngt.repository.SupplierRepository;
import warehouse.mngt.springwarehousemngt.service.SupplierService;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/suppliers")
public class SupplierController {

    private SupplierRepository supplierRepository;
    private SupplierService supplierService;

    //POST - Create New Supplier REST API
    @PostMapping
    public ResponseEntity<SupplierDto> createNewSupplier(SupplierDto supplierDto){
        SupplierDto savedSupplier = supplierService.createNewSupplier(supplierDto);
        return new ResponseEntity<>(savedSupplier, HttpStatus.CREATED);
    }

    //GET - Get Supplier By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable ("id") Long id){
        Supplier supplier = supplierRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Supplier does not exist with Id:" + id));
        return ResponseEntity.ok(supplier);
    }

    //GET - Get All Suppliers REST API
    @GetMapping
    public ResponseEntity<List<SupplierDto>> getAllSuppliers(){
        List<SupplierDto> suppliers = supplierService.getAllSuppliers();
        return ResponseEntity.ok(suppliers);
    }

    //UPDATE - Update Supplier REST API
    @PutMapping("{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable ("id") long id,
                                                   @RequestBody Supplier supplierDetails){
        Supplier updateSupplier = supplierRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Supplier does not exist with id: " + id));

        updateSupplier.setSupplierName(supplierDetails.getSupplierName());
        updateSupplier.setSupplierCode(supplierDetails.getSupplierCode());
        updateSupplier.setContactInfo(supplierDetails.getContactInfo());
        updateSupplier.setStatus(supplierDetails.getStatus());
        updateSupplier.setProducts(supplierDetails.getProducts());

        supplierRepository.save(updateSupplier);
        return ResponseEntity.ok(updateSupplier);
    }

    // DELETE - Delete Supplier REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable ("id") Long supplierId){
        supplierService.deleteSupplier(supplierId);
        return ResponseEntity.ok("Supplier Deleted Successfully");
    }
}
