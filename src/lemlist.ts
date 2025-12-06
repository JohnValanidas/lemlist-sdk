import { minimalCampaignsSchema, campaignSchema, Result, GetCampaignsParams } from "./types";
import * as v from 'valibot';
 
interface LemListAPIOptions {
    baseUrl?: string;
}

const defaultOptions: LemListAPIOptions = {
    baseUrl: "https://api.lemlist.com/api"
}


export class LemListAPI {
    private readonly options: LemListAPIOptions;

    constructor(private readonly apiKey: string, options: LemListAPIOptions = defaultOptions) {
        this.apiKey = apiKey;
        this.options = { ...defaultOptions, ...options };
    }

    private async request<T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
        method: string, 
        path: string, 
        options: { body?: any; schema: T }
    ): Promise<Result<v.InferOutput<T>>> {
        const fetchOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`:${this.apiKey}`)}`
            }
        };
        
        if (options.body) {
            fetchOptions.body = JSON.stringify(options.body);
        }

        const result: Result<v.InferOutput<T>> = {
            success: false,
            data: undefined
        };
        
        try {
            const response = await fetch(`${this.options.baseUrl}${path}`, fetchOptions);
            const data = await response.json();
            const parsedData = v.parse(options.schema, data);
            result.success = true;
            result.data = parsedData;
            result.success = true;
        } catch (error) {
            result.error = error;
        } finally {
            return result;
        }
    }

    public getCampaigns(params?: GetCampaignsParams) {
        return this.request("GET", "/campaigns", { schema: minimalCampaignsSchema });
    }

    public getCampaign(campaignId: string) {
        return this.request("GET", `/campaigns/${campaignId}`, { schema: campaignSchema });
    }
}