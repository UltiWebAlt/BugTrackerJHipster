import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProject } from 'app/entities/project/project.model';
import { ProjectService } from 'app/entities/project/service/project.service';
import { ILabel } from 'app/entities/label/label.model';
import { LabelService } from 'app/entities/label/service/label.service';
import { TicketService } from '../service/ticket.service';
import { ITicket } from '../ticket.model';
import { TicketFormService, TicketFormGroup } from './ticket-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ticket-update',
  templateUrl: './ticket-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TicketUpdateComponent implements OnInit {
  isSaving = false;
  ticket: ITicket | null = null;

  projectsSharedCollection: IProject[] = [];
  labelsSharedCollection: ILabel[] = [];

  editForm: TicketFormGroup = this.ticketFormService.createTicketFormGroup();

  constructor(
    protected ticketService: TicketService,
    protected ticketFormService: TicketFormService,
    protected projectService: ProjectService,
    protected labelService: LabelService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareProject = (o1: IProject | null, o2: IProject | null): boolean => this.projectService.compareProject(o1, o2);

  compareLabel = (o1: ILabel | null, o2: ILabel | null): boolean => this.labelService.compareLabel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ticket }) => {
      this.ticket = ticket;
      if (ticket) {
        this.updateForm(ticket);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ticket = this.ticketFormService.getTicket(this.editForm);
    if (ticket.id !== null) {
      this.subscribeToSaveResponse(this.ticketService.update(ticket));
    } else {
      this.subscribeToSaveResponse(this.ticketService.create(ticket));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITicket>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ticket: ITicket): void {
    this.ticket = ticket;
    this.ticketFormService.resetForm(this.editForm, ticket);

    this.projectsSharedCollection = this.projectService.addProjectToCollectionIfMissing<IProject>(
      this.projectsSharedCollection,
      ticket.project,
    );
    this.labelsSharedCollection = this.labelService.addLabelToCollectionIfMissing<ILabel>(
      this.labelsSharedCollection,
      ...(ticket.labels ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.projectService
      .query()
      .pipe(map((res: HttpResponse<IProject[]>) => res.body ?? []))
      .pipe(map((projects: IProject[]) => this.projectService.addProjectToCollectionIfMissing<IProject>(projects, this.ticket?.project)))
      .subscribe((projects: IProject[]) => (this.projectsSharedCollection = projects));

    this.labelService
      .query()
      .pipe(map((res: HttpResponse<ILabel[]>) => res.body ?? []))
      .pipe(map((labels: ILabel[]) => this.labelService.addLabelToCollectionIfMissing<ILabel>(labels, ...(this.ticket?.labels ?? []))))
      .subscribe((labels: ILabel[]) => (this.labelsSharedCollection = labels));
  }
}
