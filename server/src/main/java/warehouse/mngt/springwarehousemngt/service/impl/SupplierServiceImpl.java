package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.SupplierDto;
import warehouse.mngt.springwarehousemngt.entity.Supplier;
import warehouse.mngt.springwarehousemngt.repository.SupplierRepository;
import warehouse.mngt.springwarehousemngt.service.SupplierService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private SupplierRepository supplierRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Supplier
    @Override
    public SupplierDto createNewSupplier(SupplierDto supplierDto) {
        Supplier supplier = modelMapper.map(supplierDto, Supplier.class);
        Supplier savedSupplier = supplierRepository.save(supplier);
        return modelMapper.map(savedSupplier, SupplierDto.class);
    }

    // REST API - Get Supplier By ID
    @Override
    public SupplierDto getSupplierById(Long supplierId) {
        Supplier supplier = supplierRepository.findAllById(supplierId)
                .orElseThrow(()-> new RuntimeException("Supplier doesn't exist with a given Id:" + supplierId));
        return modelMapper.map(supplier, SupplierDto.class);
    }

    // REST API - Get All Suppliers
    @Override
    public List<SupplierDto> getAllSuppliers() {
       List<Supplier> suppliers = supplierRepository.findAll();
       return suppliers.stream().map((supplier)-> modelMapper.map(supplier, SupplierDto.class))
               .collect(Collectors.toList());
    }

    // REST API - Update Supplier
    @Override
    public SupplierDto updateSupplier(Long supplierId, SupplierDto updateSupplier) {
        Supplier supplier = supplierRepository.findAllById(supplierId)
                .orElseThrow(()-> new RuntimeException("Supplier doesn't exist with a given Id:" + supplierId));

        supplier.setSupplierName(updateSupplier.getSupplierName());
        supplier.setSupplierCode(updateSupplier.getSupplierCode());
        supplier.setContactInfo(updateSupplier.getContactInfo());
        supplier.setStatus(updateSupplier.getStatus());
        supplier.setProducts(updateSupplier.getProducts());
        supplier.setContactAddress(updateSupplier.getContactAddress());
        supplier.setSupplierCompany(updateSupplier.getSupplierCompany());
        supplier.setSupplierEmail(updateSupplier.getSupplierEmail());

        Supplier updateSupplierObj = supplierRepository.save(supplier);
        return modelMapper.map(updateSupplierObj, SupplierDto.class);
    }

    // REST API - Delete Supplier
    @Override
    public void deleteSupplier(Long supplierId) {
        Supplier supplier = supplierRepository.findAllById(supplierId)
                .orElseThrow(()-> new RuntimeException("Supplier doesn't exist with given id:" + supplierId));
      supplierRepository.deleteById(supplierId);
    }
}
