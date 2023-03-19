package com.invoice.ms.service;

import com.invoice.ms.client.SaleFeignClient;
import com.invoice.ms.domain.Invoice;
import com.invoice.ms.repository.InvoiceRepository;
import com.invoice.ms.service.dto.InvoiceDTO;
import com.invoice.ms.service.mapper.InvoiceMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Invoice}.
 */
@Service
public class InvoiceService {

    private final Logger log = LoggerFactory.getLogger(InvoiceService.class);

    private final InvoiceRepository invoiceRepository;

    private final InvoiceMapper invoiceMapper;

    private final SaleFeignClient saleFeignClient;

    public InvoiceService(InvoiceRepository invoiceRepository, InvoiceMapper invoiceMapper, SaleFeignClient saleFeignClient) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceMapper = invoiceMapper;
        this.saleFeignClient = saleFeignClient;
    }

    /**
     * Save a invoice.
     *
     * @param invoiceDTO the entity to save.
     * @return the persisted entity.
     */
    public InvoiceDTO save(InvoiceDTO invoiceDTO) {
        log.debug("Request to save Invoice : {}", invoiceDTO);
        Invoice invoice = invoiceMapper.toEntity(invoiceDTO);
        invoice = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(invoice);
    }

    /**
     * Update a invoice.
     *
     * @param invoiceDTO the entity to save.
     * @return the persisted entity.
     */
    public InvoiceDTO update(InvoiceDTO invoiceDTO) {
        log.debug("Request to update Invoice : {}", invoiceDTO);
        Invoice invoice = invoiceMapper.toEntity(invoiceDTO);
        invoice = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(invoice);
    }

    /**
     * Partially update a invoice.
     *
     * @param invoiceDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<InvoiceDTO> partialUpdate(InvoiceDTO invoiceDTO) {
        log.debug("Request to partially update Invoice : {}", invoiceDTO);

        return invoiceRepository
            .findById(invoiceDTO.getId())
            .map(existingInvoice -> {
                invoiceMapper.partialUpdate(existingInvoice, invoiceDTO);

                return existingInvoice;
            })
            .map(invoiceRepository::save)
            .map(invoiceMapper::toDto);
    }

    /**
     * Get all the invoices.
     *
     * @return the list of entities.
     */
    public List<InvoiceDTO> findAll() {
        log.debug("Request to get all Invoices");

        List<InvoiceDTO> listInvoiceDTO = invoiceRepository
            .findAll()
            .stream()
            .map(invoiceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));

        for (int i = 0; i < listInvoiceDTO.size(); i++) {
            //listInvoiceDTO.get(i).setSales(fieldsService.findAllByCategory(listCategoryDTO.get(i)));

            listInvoiceDTO.get(i).setSales(saleFeignClient.getAllSalesByIdinvoice(listInvoiceDTO.get(i).getId()));
        }

        return listInvoiceDTO;
    }

    /**
     * Get one invoice by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<InvoiceDTO> findOne(String id) {
        log.debug("Request to get Invoice : {}", id);
        return invoiceRepository.findById(id).map(invoiceMapper::toDto);
    }

    /**
     * Delete the invoice by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Invoice : {}", id);
        invoiceRepository.deleteById(id);
    }
}
