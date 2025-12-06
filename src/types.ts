import * as v from 'valibot';

export interface Result<T> {
    success: boolean;
    data?: T;
    error?: unknown;
}
export type GetCampaignsParams = {
    page?: number;
    limit?: number;
}

export const campaignSchema = v.object({
    _id: v.string(),
    name: v.string(),
    labels: v.array(v.string()),
    createdAt: v.string(),
    createdBy: v.string(),
    status: v.string(),
    sequenceId: v.number(),
    scheduleIds: v.array(v.string()),
    teamId: v.string(),
    hasError: v.boolean(),
    errors: v.array(v.string()),
    creator: v.object({
        userId: v.string(),
        userEmail: v.string(),
    }),
});

export type Campaign = v.InferOutput<typeof campaignSchema>;

export const minimalCampaignSchema = v.object({
    _id: v.string(),
    name: v.string(),
    createdAt: v.string(),
    createdBy: v.string(),
    status: v.string(),
});

export const minimalCampaignsSchema = v.array(minimalCampaignSchema);

export type MinimalCampaign = v.InferOutput<typeof minimalCampaignSchema>;


