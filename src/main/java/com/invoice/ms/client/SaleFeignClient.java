package com.invoice.ms.client;

import com.invoice.ms.service.dto.SaleDTO;
import feign.Headers;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "127.0.0.1:8082")
@Headers({ "Accept: application/json", "Content-Type: application/json" })
public interface SaleFeignClient {
    @GetMapping("api/salesbyidinvoice/{idinvoice}")
    public List<SaleDTO> getAllSalesByIdinvoice(@PathVariable("idinvoice") String idinvoice);
}
