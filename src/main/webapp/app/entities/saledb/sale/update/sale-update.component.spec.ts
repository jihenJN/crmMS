import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SaleFormService } from './sale-form.service';
import { SaleService } from '../service/sale.service';
import { ISale } from '../sale.model';

import { SaleUpdateComponent } from './sale-update.component';

describe('Sale Management Update Component', () => {
  let comp: SaleUpdateComponent;
  let fixture: ComponentFixture<SaleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let saleFormService: SaleFormService;
  let saleService: SaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SaleUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SaleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SaleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    saleFormService = TestBed.inject(SaleFormService);
    saleService = TestBed.inject(SaleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const sale: ISale = { id: 'CBA' };

      activatedRoute.data = of({ sale });
      comp.ngOnInit();

      expect(comp.sale).toEqual(sale);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISale>>();
      const sale = { id: 'ABC' };
      jest.spyOn(saleFormService, 'getSale').mockReturnValue(sale);
      jest.spyOn(saleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sale }));
      saveSubject.complete();

      // THEN
      expect(saleFormService.getSale).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(saleService.update).toHaveBeenCalledWith(expect.objectContaining(sale));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISale>>();
      const sale = { id: 'ABC' };
      jest.spyOn(saleFormService, 'getSale').mockReturnValue({ id: null });
      jest.spyOn(saleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sale: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sale }));
      saveSubject.complete();

      // THEN
      expect(saleFormService.getSale).toHaveBeenCalled();
      expect(saleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISale>>();
      const sale = { id: 'ABC' };
      jest.spyOn(saleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(saleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
