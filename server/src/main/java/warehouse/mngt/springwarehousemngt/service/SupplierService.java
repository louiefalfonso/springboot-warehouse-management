package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.SupplierDto;

import java.util.List;

public interface SupplierService {

    SupplierDto createNewSupplier (SupplierDto supplierDto);

    SupplierDto getSupplierById(Long supplierId);

    List<SupplierDto> getAllSuppliers();

    SupplierDto updateSupplier(Long supplierId, SupplierDto updateSupplier);

    void deleteSupplier(Long supplierId);
}
