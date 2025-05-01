package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.WarehouseDto;
import warehouse.mngt.springwarehousemngt.entity.Warehouse;
import warehouse.mngt.springwarehousemngt.repository.WarehouseRepository;
import warehouse.mngt.springwarehousemngt.service.WarehouseService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private WarehouseRepository warehouseRepository;
    private ModelMapper modelMapper;


    // REST API - Create New Warehouse
    @Override
    public WarehouseDto createNewWarehouse(WarehouseDto warehouseDto) {
        Warehouse warehouse = modelMapper.map(warehouseDto, Warehouse.class);
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);
        return modelMapper.map(savedWarehouse, WarehouseDto.class);
    }


    // REST API - Get Warehouse By ID
    @Override
    public WarehouseDto getWarehouseById(Long warehouseId) {
        Warehouse warehouse = warehouseRepository.findAllById(warehouseId)
                .orElseThrow(()->new RuntimeException("Warehouse doesn't exist with a given Id:" + warehouseId));
        return modelMapper.map(warehouseId, WarehouseDto.class);
    }


    // REST API - Get All Warehouses
    @Override
    public List<WarehouseDto> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        return warehouses.stream().map((warehouse)->modelMapper.map(warehouse, WarehouseDto.class))
                .collect(Collectors.toList());
    }


    // REST API - Update Warehouse
    @Override
    public WarehouseDto updateWarehouse(Long warehouseId, WarehouseDto updateWarehouse) {
        Warehouse warehouse = warehouseRepository.findAllById(warehouseId)
                .orElseThrow(()->new RuntimeException("Warehouse doesn't exist with a given Id:" + warehouseId));

        warehouse.setWarehouseName(updateWarehouse.getWarehouseName());
        warehouse.setWarehouseCode(updateWarehouse.getWarehouseCode());
        warehouse.setOfficeHours(updateWarehouse.getOfficeHours());
        warehouse.setWarehouseLocation(updateWarehouse.getWarehouseLocation());
        warehouse.setWarehouseManager(updateWarehouse.getWarehouseManager());
        warehouse.setContactNumber(updateWarehouse.getContactNumber());

        Warehouse updateWarehouseObj = warehouseRepository.save(warehouse);
        return modelMapper.map(updateWarehouseObj, WarehouseDto.class);
    }


    // REST API - Delete Warehouse
    @Override
    public void deleteWarehouse(Long warehouseId) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(()-> new RuntimeException("Warehouse doesn't exist with given id:" + warehouseId));
        warehouse.setDeleted(true);
        warehouseRepository.save(warehouse);
    }


    // REST API - Get All Deleted Warehouses
    @Override
    public List<WarehouseDto> getAllDeletedWarehouses() {
       List<Warehouse> deletedWarehouses = warehouseRepository.findByDeleted(true);
       return deletedWarehouses.stream()
               .map(warehouse -> modelMapper.map(warehouse, WarehouseDto.class))
               .collect(Collectors.toList());
    }


    // REST API - Get Deleted Warehouse By ID
    @Override
    public WarehouseDto getDeletedWarehouseById(Long id) {
        Warehouse warehouse = warehouseRepository.findByIdAndDeleted(id, true)
                .orElseThrow(()-> new RuntimeException("Deleted Warehouse doesn't exist with a given Id:" + id));
        return modelMapper.map(warehouse, WarehouseDto.class);
    }
}
